import { X } from "lucide-react";
import DifficultyMeter from "./DifficultyMeter.tsx";
import type { Score } from "../types.ts";

function PreviewModal({ score, onClose }: { score: Score; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(13,12,20,0.88)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              {score.title}
            </h2>
            <p className="text-sm text-muted-foreground">{score.composer} - {score.instrument}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs font-mono tracking-wider px-2 py-1 rounded-sm" style={{ backgroundColor: "rgba(212,168,67,0.15)", color: "#d4a843", border: "1px solid rgba(212,168,67,0.25)" }}>
              {score.genre.toUpperCase()}
            </span>
            <DifficultyMeter level={score.difficulty} />
            <span className="text-xs font-mono text-muted-foreground">{score.pages} pages total</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Showing {score.previewPages.length} of {score.pages} pages - purchase for the complete score including fingering notes and dynamic markings.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {score.previewPages.map((pid, i) => (
              <div key={i} className="relative rounded-md overflow-hidden bg-secondary aspect-[3/4]">
                <img
                  src={`https://images.unsplash.com/photo-${pid}?w=300&h=400&fit=crop&auto=format&sat=-60&bri=20`}
                  alt={`Preview page ${i + 1}`}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-end p-2">
                  <span className="text-[10px] font-mono text-foreground/50 bg-background/60 px-1.5 py-0.5 rounded">
                    p. {i + 1}
                  </span>
                </div>
                {i === score.previewPages.length - 1 && score.pages > score.previewPages.length && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c14]/80 via-[#0d0c14]/30 to-transparent flex items-center justify-center">
                    <span className="text-xs font-mono text-foreground/70 text-center px-3">
                      +{score.pages - score.previewPages.length} more pages
                      <br />
                      after purchase
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "#d4a843" }}>
              ${score.price.toFixed(2)}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded font-medium text-sm transition-colors"
              style={{ backgroundColor: "#d4a843", color: "#0d0c14" }}
            >
              Purchase Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
