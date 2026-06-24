import Parser from "rss-parser";

export const config = {
  maxDuration: 15,
};

const parser = new Parser({ timeout: 5000 });

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

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "Inauguración de la nueva Estación Agroclimatológica Digital en el Campus",
    category: "Institucional",
    date: "22 de Junio, 2026",
    summary: "La UNAHUR instaló sensores IoT de última generación para medir temperatura de suelo, radiación solar y humedad del aire, de acceso abierto para toda la carrera.",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR"
  },
  {
    id: "news-2",
    title: "Visita de campo al INTA Castelar: Manejo de Plagas en Horticultura",
    category: "Prácticas",
    date: "18 de Junio, 2026",
    summary: "Estudiantes de Manejo Agroecológico de Adversidades visitaron el instituto nacional para capacitarse en técnicas de biocontrol usando parasitoides nativos de la pampa.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR"
  },
  {
    id: "news-3",
    title: "Abierta la Convocatoria de Becas de Estímulo a la Investigación Agraria",
    category: "Becas",
    date: "15 de Junio, 2026",
    summary: "Se seleccionarán 4 proyectos enfocados en la sustentabilidad del Cinturón Verde Bonaerense. Convocatoria abierta para alumnos de 4° y 5° año.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR"
  }
];

export default async function handler(_req: any, res: any) {
  try {
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
      } catch {
        return [] as NewsItem[];
      }
    });

    const results = await Promise.all(promises);
    const allItems = results.flat();
    const sorted = allItems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30);

    if (sorted.length > 0) {
      res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
      return res.json({ success: true, data: sorted });
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.json({ success: true, data: FALLBACK_NEWS });
  } catch (err: any) {
    res.setHeader("Cache-Control", "s-maxage=60");
    return res.json({ success: true, data: FALLBACK_NEWS });
  }
}
