import React from "react";
import { MessageSquare, PlusCircle, Heart, Send } from "lucide-react";
import { SUBJECTS_DATA } from "../data";
import { ForumPost } from "../types";

interface ForumSectionProps {
  forumPosts: ForumPost[];
  commentInputs: { [postId: string]: string };
  setCommentInputs: React.Dispatch<React.SetStateAction<{ [postId: string]: string }>>;
  handleLikePost: (postId: string) => void;
  handleAddComment: (postId: string) => void;
  setIsNewPostOpen: (open: boolean) => void;
}

export const ForumSection: React.FC<ForumSectionProps> = ({
  forumPosts,
  commentInputs,
  setCommentInputs,
  handleLikePost,
  handleAddComment,
  setIsNewPostOpen,
}) => {
  return (
    <div className="space-y-8" id="forum-section">
      {/* Editorial Header */}
      <div className="bg-[var(--bg3)] border border-[var(--border-15)] p-6 md:p-8 rounded-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[var(--border-10)] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent3)] font-semibold">
              <MessageSquare className="w-4 h-4" />
              <span>Espacio de Debate</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-[var(--text)]">
              Foro de Consultas y Campo
            </h2>
            <p className="text-xs text-[var(--text2)] font-sans max-w-xl leading-relaxed">
              Resolvé dudas teóricas, organizá grupos de estudio o intercambiá opiniones de manejo técnico con compañeros e instructores.
            </p>
          </div>

          <button
            onClick={() => setIsNewPostOpen(true)}
            className="w-full sm:w-auto bg-[var(--footer)] hover:bg-[var(--accent4)] text-[var(--bg2)] font-serif font-bold text-xs px-5 py-3 rounded-none uppercase tracking-wider transition-all border border-[var(--border)] cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Nueva Consulta</span>
          </button>
        </div>
      </div>

      {/* Forum Feed */}
      <div className="space-y-6">
        {forumPosts.map((post) => {
          const subjectRef = SUBJECTS_DATA.find((s) => s.id === post.subjectId);

          return (
            <div
              key={post.id}
              className="bg-[var(--bg3)] p-6 rounded-none border border-[var(--border-15)] shadow-none space-y-5 relative"
            >
              {/* Post Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-10)] pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-serif italic font-bold text-[var(--text)]">{post.author}</span>
                    <span className="bg-[var(--accent2)] text-[var(--accent4)] text-[9px] font-mono uppercase px-2 py-0.5 font-bold">
                      {post.authorRole}
                    </span>
                    <span className="text-[11px] text-[var(--text3)]">· {post.timestamp}</span>
                  </div>
                  <h3 className="font-serif font-black text-[var(--text)] text-lg sm:text-xl leading-snug">
                    {post.title}
                  </h3>
                </div>

                {subjectRef && (
                  <span className="bg-[var(--bg2)] text-[var(--text)] text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 border border-[var(--border-15)] whitespace-nowrap self-start sm:self-auto">
                    {subjectRef.name}
                  </span>
                )}
              </div>

              {/* Post Content */}
              <div className="text-xs sm:text-sm text-[var(--text2)] leading-relaxed font-sans whitespace-pre-line bg-[var(--bg2)]/40 p-4 border border-[var(--border-5)]">
                {post.content}
              </div>

              {/* Tags & Action Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--border-5)] text-xs">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] bg-[var(--stone-bg)] text-[var(--text2)] px-2 py-0.5 border border-[var(--stone-border)]/60 font-mono uppercase tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Likes and stats */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none border transition-all cursor-pointer text-xs font-serif ${
                      post.likedByUser
                        ? "bg-[var(--accent1)] border-[var(--border)] text-[var(--text)] font-bold"
                        : "bg-[var(--bg-white)] border-[var(--border-10)] text-[var(--text2)] hover:border-[var(--border-30)]"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.likedByUser ? "fill-[var(--text)] text-[var(--text)]" : "text-[var(--text4)]"}`} />
                    <span>{post.likes} {post.likes === 1 ? "voto" : "votos"}</span>
                  </button>

                  <span className="text-[var(--text3)] font-serif italic text-xs">
                    {post.replies.length} {post.replies.length === 1 ? "respuesta" : "respuestas"}
                  </span>
                </div>
              </div>

              {/* Replies List */}
              {post.replies.length > 0 && (
                <div className="bg-[var(--bg3)] p-5 rounded-none space-y-4 border-t border-[var(--border-10)]">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent3)] font-bold">
                    Aportes de la Comunidad:
                  </p>
                  <div className="space-y-4 divide-y divide-[var(--stone-border)]/60">
                    {post.replies.map((reply, index) => (
                      <div key={reply.id} className={`pt-4 ${index === 0 ? "pt-0 border-t-0" : ""}`}>
                        <div className="flex items-center gap-2 text-xs mb-1.5">
                          <span className="font-serif font-black text-[var(--text)]">{reply.author}</span>
                          <span className="bg-[var(--accent2)] text-[var(--accent4)] text-[9px] px-1.5 py-0.2 font-mono uppercase">
                            {reply.authorRole}
                          </span>
                          <span className="text-[10px] text-[var(--text4)]">· {reply.timestamp}</span>
                        </div>
                        <p className="text-xs text-[var(--text2)] leading-relaxed font-sans bg-[var(--bg-white)] p-3 border border-[var(--stone-border)]">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Input Form */}
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-5)]">
                <input
                  type="text"
                  placeholder="Sumá tu comentario o aporte técnico..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment(post.id);
                  }}
                  className="flex-1 bg-[var(--bg-white)] text-xs px-3.5 py-3 rounded-none border border-[var(--border-15)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)] font-sans"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="bg-[var(--footer)] hover:bg-[var(--accent4)] text-white p-3 rounded-none border border-[var(--border)] transition-colors cursor-pointer shrink-0"
                  title="Enviar respuesta"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
