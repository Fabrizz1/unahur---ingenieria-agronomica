import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";

const parser = new Parser();
const CACHE_DURATION = 15 * 60 * 1000;
let cache: { data: NewsItem[]; timestamp: number } | null = null;

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  image: string;
  link: string;
  source: string;
}

const RSS_SOURCES = [
  { url: "https://inta.gob.ar/rss.xml", name: "INTA", category: "INTA" },
  { url: "https://www.infocampo.com.ar/feed/", name: "Infocampo", category: "Infocampo" },
  { url: "https://bichosdecampo.com/feed/", name: "Bichos de Campo", category: "Bichos de Campo" },
  { url: "https://www.agritotal.com/rss", name: "Agritotal", category: "Agritotal" },
  { url: "https://www.fao.org/feeds/fao-newsroom-rss", name: "FAO", category: "FAO" },
  { url: "https://www.todoagro.com.ar/rss-feed-de-noticias/", name: "TodoAgro", category: "TodoAgro" },
  { url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/campo/", name: "LA NACION", category: "LA NACION Campo" },
  { url: "https://camponews.com.ar/feed/", name: "Campo News", category: "Campo News" },
];

function extractImage(item: any): string {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item["media:content"]?.url) return item["media:content"].url;
  if (item["media:thumbnail"]?.url) return item["media:thumbnail"].url;
  const match = item.content?.match(/<img[^>]+src=["']([^"']+)["']/);
  if (match) return match[1];
  return "";
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "Fecha no disponible";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function fetchAllFeeds(): Promise<NewsItem[]> {
  const promises = RSS_SOURCES.map(async (source) => {
    try {
      const feed = await parser.parseURL(source.url);
      return feed.items.map((item, i) => ({
        id: `${source.name}-${i}-${Date.now()}`,
        title: item.title || "Sin título",
        category: source.category,
        date: formatDate(item.pubDate),
        summary: item.contentSnippet?.slice(0, 300) || item.content?.slice(0, 300).replace(/<[^>]+>/g, "") || "Sin resumen disponible.",
        image: extractImage(item),
        link: item.link || "#",
        source: source.name,
      }));
    } catch (err) {
      console.warn(`Error fetching ${source.name}:`, (err as Error).message);
      return [];
    }
  });

  const results = await Promise.all(promises);
  const allItems = results.flat();
  return allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 30);
}

async function getCachedNews(): Promise<NewsItem[]> {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }
  const data = await fetchAllFeeds();
  cache = { data, timestamp: Date.now() };
  return data;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/noticias", async (_req, res) => {
    try {
      const news = await getCachedNews();
      res.json({ success: true, data: news });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
