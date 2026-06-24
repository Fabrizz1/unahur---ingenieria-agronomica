import Parser from "rss-parser";

export const config = {
  maxDuration: 15,
};

const parser = new Parser({ timeout: 5000 });

interface NewsItem {
  id: string;
  title: string;
  section: string;
  date: string;
  summary: string;
  image: string;
  link: string;
  source: string;
}

interface RssSource {
  url: string;
  name: string;
  section: string;
}

const POLITICA_KEYWORDS = [
  "política", "políticas", "gobierno", "ley", "leyes", "decreto", "senado",
  "diputados", "ministerio", "regulación", "congreso", "legislación",
  "normativa", "presidente", "reforma", "elecciones", "legislativo",
  "ejecutivo", "estado",
];

function detectSection(sourceSection: string, title: string, summary: string): string {
  const text = `${title} ${summary}`.toLowerCase();
  for (const kw of POLITICA_KEYWORDS) {
    if (text.includes(kw)) return "Política";
  }
  return sourceSection;
}

const RSS_SOURCES: RssSource[] = [
  { url: "https://www.infocampo.com.ar/feed/", name: "Infocampo", section: "Noticias" },
  { url: "https://bichosdecampo.com/feed/", name: "Bichos de Campo", section: "Noticias" },
  { url: "https://www.todoagro.com.ar/rss-feed-de-noticias/", name: "TodoAgro", section: "Noticias" },
  { url: "https://camponews.com.ar/feed/", name: "Campo News", section: "Noticias" },
  { url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/campo/", name: "LA NACION", section: "Economía" },
  { url: "https://www.agritotal.com/rss", name: "Agritotal", section: "Economía" },
  { url: "https://agroecologia.net.ar/feed/", name: "Agroecología en Red", section: "Agroecología" },
  { url: "https://inta.gob.ar/rss.xml", name: "INTA", section: "Investigación" },
  { url: "https://www.fao.org/feeds/fao-newsroom-rss", name: "FAO", section: "Investigación" },
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
    id: "fallback-noticias-1",
    title: "Inauguración de la nueva Estación Agroclimatológica Digital en el Campus",
    section: "Noticias",
    date: "22 de Junio, 2026",
    summary: "La UNAHUR instaló sensores IoT de última generación para medir temperatura de suelo, radiación solar y humedad del aire, de acceso abierto para toda la carrera.",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-noticias-2",
    title: "Visita de campo al INTA Castelar: Manejo de Plagas en Horticultura",
    section: "Noticias",
    date: "18 de Junio, 2026",
    summary: "Estudiantes de Manejo Agroecológico de Adversidades visitaron el instituto nacional para capacitarse en técnicas de biocontrol usando parasitoides nativos de la pampa.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-economia-1",
    title: "Abierta la Convocatoria de Becas de Estímulo a la Investigación Agraria",
    section: "Economía",
    date: "15 de Junio, 2026",
    summary: "Se seleccionarán 4 proyectos enfocados en la sustentabilidad del Cinturón Verde Bonaerense. Convocatoria abierta para alumnos de 4° y 5° año.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-politica-1",
    title: "Nueva Ley de Presupuestos Mínimos para la Agricultura Familiar en debate legislativo",
    section: "Política",
    date: "10 de Junio, 2026",
    summary: "El Congreso debate un proyecto de ley que establece un marco regulatorio para la agricultura familiar, incluyendo acceso a tierras, créditos blandos y asistencia técnica estatal.",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-agroecologia-1",
    title: "Taller de Conservación de Semillas Nativas en la Huerta Comunidad Ferroviaria",
    section: "Agroecología",
    date: "5 de Junio, 2026",
    summary: "Se realizó un taller gratuito de conservación de semillas criollas y nativas, abierto a toda la comunidad, con enfoque en la recuperación de variedades locales y soberanía alimentaria.",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR",
  },
  {
    id: "fallback-investigacion-1",
    title: "Ensayo comparativo de rendimiento entre cultivos de cobertura y barbecho químico en la Pampa Ondulada",
    section: "Investigación",
    date: "1 de Junio, 2026",
    summary: "Un estudio conjunto entre UNAHUR e INTA evaluó el impacto de diferentes cultivos de cobertura sobre la materia orgánica del suelo, la retención hídrica y el rendimiento del cultivo subsiguiente de maíz.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
    link: "#",
    source: "UNAHUR",
  },
];

export default async function handler(_req: any, res: any) {
  try {
    const promises = RSS_SOURCES.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url);
        return feed.items.map((item, i) => {
          const summary = item.contentSnippet?.slice(0, 300) || item.content?.slice(0, 300).replace(/<[^>]+>/g, "") || "Sin resumen disponible.";
          return {
            id: `${source.name}-${i}-${Date.now()}`,
            title: item.title || "Sin título",
            section: detectSection(source.section, item.title || "", summary),
            date: formatDate(item.pubDate),
            summary,
            image: extractImage(item),
            link: item.link || "#",
            source: source.name,
          };
        });
      } catch {
        return [] as NewsItem[];
      }
    });

    const results = await Promise.all(promises);
    const allItems = results.flat();
    const sorted = allItems
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 50);

    if (sorted.length > 0) {
      res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
      return res.json({ success: true, data: sorted });
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.json({ success: true, data: FALLBACK_NEWS });
  } catch {
    res.setHeader("Cache-Control", "s-maxage=60");
    return res.json({ success: true, data: FALLBACK_NEWS });
  }
}
