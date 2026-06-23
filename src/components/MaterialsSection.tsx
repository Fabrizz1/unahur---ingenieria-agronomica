import React from "react";
import { BookOpen, Search, Upload, ChevronRight, FileText, PlusCircle, AlertCircle } from "lucide-react";
import { SUBJECTS_DATA } from "../data";
import { SharedMaterial, Subject } from "../types";

interface MaterialsSectionProps {
  sharedMaterials: SharedMaterial[];
  searchSubject: string;
  setSearchSubject: (val: string) => void;
  selectedYear: number | "todos";
  setSelectedYear: (val: number | "todos") => void;
  selectedArea: string | "todos";
  setSelectedArea: (val: string | "todos") => void;
  expandedSubjectId: string | null;
  setExpandedSubjectId: (id: string | null) => void;
  setIsUploadOpen: (open: boolean) => void;
  setUploadSubjectId: (id: string) => void;
  handleDownloadMaterial: (id: string, title: string) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  sharedMaterials,
  searchSubject,
  setSearchSubject,
  selectedYear,
  setSelectedYear,
  selectedArea,
  setSelectedArea,
  expandedSubjectId,
  setExpandedSubjectId,
  setIsUploadOpen,
  setUploadSubjectId,
  handleDownloadMaterial,
}) => {
  // Filtering logic inside component
  const filteredSubjects = SUBJECTS_DATA.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchSubject.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchSubject.toLowerCase());
    const matchesYear = selectedYear === "todos" || subject.year === selectedYear;
    const matchesArea = selectedArea === "todos" || subject.area === selectedArea;
    return matchesSearch && matchesYear && matchesArea;
  });

  return (
    <div className="space-y-8" id="materials-section">
      {/* Title & Filter Masthead */}
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[var(--border-10)] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Sección Académica</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
              Biblioteca Colectiva de Materias
            </h2>
            <p className="text-xs text-[var(--text2)] font-sans max-w-xl leading-relaxed">
              Repositorio de apuntes, desgrabaciones de prácticos y guías de campo aportados por la comunidad de estudiantes de Ingeniería Agronómica.
            </p>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="w-full md:w-auto bg-[var(--footer)] hover:bg-[var(--accent4)] text-[var(--bg2)] font-serif font-bold text-xs px-5 py-3 rounded-none uppercase tracking-wider transition-all border border-[var(--border)] cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Colaborar con un Apunte</span>
          </button>
        </div>

        {/* Filters bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {/* Search box */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text3)] block">Buscar Palabra Clave</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-[var(--text4)]" />
              <input
                type="text"
                placeholder="Edafología, Química, Botánica..."
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="pl-9 pr-3 py-2.5 w-full text-xs rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)] font-sans"
              />
            </div>
          </div>

          {/* Year Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text3)] block">Año de Cursada</label>
            <select
              value={selectedYear}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedYear(val === "todos" ? "todos" : Number(val));
              }}
              className="py-2.5 px-3 w-full text-xs rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)] font-sans"
            >
              <option value="todos">Todos los Años (1° a 5°)</option>
              <option value="1">1° Año (Ciencias Básicas)</option>
              <option value="2">2° Año</option>
              <option value="3">3° Año (Título Intermedio)</option>
              <option value="4">4° Año</option>
              <option value="5">5° Año (Egreso/TFI)</option>
            </select>
          </div>

          {/* Area Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--text3)] block">Especialidad Agraria</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="py-2.5 px-3 w-full text-xs rounded-none border border-[var(--border-15)] bg-[var(--bg-white)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)] font-sans"
            >
              <option value="todos">Todas las Especialidades</option>
              <option value="Ciencias Básicas">Ciencias Básicas</option>
              <option value="Suelos y Clima">Suelos y Clima</option>
              <option value="Producción Vegetal">Producción Vegetal</option>
              <option value="Producción Animal">Producción Animal</option>
              <option value="Tecnología e Ingeniería">Tecnología e Ingeniería</option>
              <option value="Socioeconomía y Extensión">Socioeconomía y Extensión</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accordion / List of Subjects */}
      <div className="space-y-4">
        {filteredSubjects.length === 0 ? (
          <div className="bg-[var(--bg3)] border border-[var(--border-10)] p-12 text-center rounded-none">
            <AlertCircle className="w-8 h-8 text-[var(--accent3)] mx-auto mb-3" />
            <p className="text-sm font-serif font-bold text-[var(--text)]">Ninguna materia coincide con la búsqueda.</p>
            <p className="text-xs text-[var(--text3)] mt-1 font-sans">Probá removiendo filtros de año o ajustando las palabras clave.</p>
          </div>
        ) : (
          filteredSubjects.map((subject) => {
            const subjectMaterials = sharedMaterials.filter((m) => m.subjectId === subject.id);
            const isExpanded = expandedSubjectId === subject.id;

            return (
              <div
                key={subject.id}
                className={`bg-[var(--bg3)] border transition-all duration-300 rounded-none overflow-hidden ${
                  isExpanded
                    ? "border-[var(--border)] ring-1 ring-[var(--text)]/5 bg-[var(--bg3)]"
                    : "border-[var(--border-10)] hover:border-[var(--border-40)]"
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedSubjectId(isExpanded ? null : subject.id)}
                  className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[var(--accent1)] text-[var(--text)] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none font-semibold">
                        {subject.year}° Año · {subject.term}
                      </span>
                      <span className="bg-[var(--accent2)] text-[var(--accent4)] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none font-semibold">
                        {subject.area}
                      </span>
                    </div>
                    <h3 className="font-serif font-black text-lg sm:text-xl text-[var(--text)] flex items-center gap-2 leading-tight">
                      {subject.name}
                      {subjectMaterials.length > 0 && (
                        <span className="bg-[var(--footer)] text-[var(--bg2)] text-[10px] font-mono font-bold px-2 py-0.5">
                          {subjectMaterials.length} {subjectMaterials.length === 1 ? "apunte" : "apuntes"}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-[var(--text2)] font-sans line-clamp-1">{subject.description}</p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                    <span className="text-[11px] font-mono text-[var(--text3)] uppercase tracking-wider bg-[var(--stone-bg)]/60 px-2 py-1">
                      {subject.hours} horas
                    </span>
                    <div className={`p-1.5 border border-[var(--border-10)] bg-[var(--bg2)] text-[var(--text)] transition-transform ${isExpanded ? "rotate-90 bg-[var(--border)] text-[var(--bg)] border-[var(--border)]" : ""}`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="border-t border-[var(--border-10)] bg-[var(--bg)] p-5 space-y-5">
                    {/* Syllabus Detail Block */}
                    <div className="bg-[var(--bg-white)] p-4 border border-[var(--border-10)] text-xs text-[var(--text2)] space-y-3 leading-relaxed">
                      <p className="font-serif italic text-sm text-[var(--text)] font-medium">Descripción de la Cátedra:</p>
                      <p className="font-sans text-[var(--text2)]">{subject.description}</p>
                      {subject.correlatives && subject.correlatives.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--border-5)]">
                          <span className="font-mono text-[10px] uppercase text-[var(--text3)] tracking-wider">Correlatividades Requeridas:</span>
                          <div className="flex flex-wrap gap-1">
                            {subject.correlatives.map((cid) => {
                              const parent = SUBJECTS_DATA.find((s) => s.id === cid);
                              return (
                                <span key={cid} className="bg-[var(--stone-bg)] text-[var(--text2)] font-mono text-[9px] px-2 py-0.5 border border-[var(--stone-border)]">
                                  {parent ? parent.name : cid}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Material List */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-[var(--text)] font-bold">Ficheros Disponibles</span>
                        <button
                          onClick={() => {
                            setUploadSubjectId(subject.id);
                            setIsUploadOpen(true);
                          }}
                          className="text-[11px] font-serif font-bold text-[var(--accent3)] hover:text-[var(--text)] flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Subir material a esta materia</span>
                        </button>
                      </div>

                      {subjectMaterials.length === 0 ? (
                        <div className="bg-[var(--bg-white)] border border-dashed border-[var(--stone-border)] p-6 text-center text-xs text-[var(--text3)] rounded-none space-y-1">
                          <p className="font-serif italic text-[var(--text2)]">Aún no se han compartido archivos para esta materia.</p>
                          <p className="text-[10px] font-sans text-[var(--text4)]">Si tenés resúmenes o prácticos, hacé clic en "Subir material" para inaugurar la lista.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {subjectMaterials.map((mat) => (
                            <div
                              key={mat.id}
                              className="bg-[var(--bg-white)] p-4 border border-[var(--border-10)] hover:border-[var(--border-30)] transition-all rounded-none flex justify-between items-center gap-4 text-xs"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`p-2.5 rounded-none shrink-0 border ${
                                  mat.category === "Apunte" ? "bg-amber-50/50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800" :
                                  mat.category === "Resumen" ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800" :
                                  mat.category === "Examen" ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800" :
                                  "bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-700"
                                }`}>
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="overflow-hidden space-y-0.5">
                                  <p className="font-serif font-black text-[var(--text)] truncate" title={mat.title}>
                                    {mat.title}
                                  </p>
                                  <p className="text-[10px] text-[var(--text3)] font-sans">
                                    Por <span className="font-medium text-[var(--text2)]">{mat.author}</span> · {mat.fileSize}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[9px] font-mono text-[var(--text3)] tracking-wider">
                                  {mat.downloads} descargas
                                </span>
                                <button
                                  onClick={() => handleDownloadMaterial(mat.id, mat.title)}
                                  className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-[var(--bg2)] p-2 rounded-none transition-colors cursor-pointer border border-[var(--border)]"
                                  title="Descargar archivo"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
