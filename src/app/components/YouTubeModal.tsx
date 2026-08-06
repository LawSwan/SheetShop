import { X, Youtube } from "lucide-react";
import type { Score } from "../types.ts";

function YouTubeModal({ score, onClose }: { score: Score; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(13,12,20,0.92)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card border border-border rounded-lg w-full max-w-3xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Youtube size={18} style={{ color: "#e07b5a" }} />
            <div>
              <h2 className="text-base font-semibold leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                {score.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">{score.composer}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <div className="relative aspect-video bg-black rounded-b-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${score.youtubeId}?autoplay=1&rel=0`}
            title={`${score.title} performance`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default YouTubeModal;
