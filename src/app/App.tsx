import { lazy, Suspense, useMemo, useState } from "react";
import { Search, ShoppingCart, X, Youtube, Music, Star } from "lucide-react";
import DifficultyMeter from "./components/DifficultyMeter.tsx";
import type { GenreDatum, Score } from "./types.ts";

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_SCORES: Score[] = [
  {
    id: 1,
    title: "Clair de Lune",
    composer: "Claude Debussy",
    instrument: "Piano",
    genre: "Impressionist",
    price: 4.99,
    difficulty: 4,
    pages: 8,
    youtubeId: "CvFH_6DNRCY",
    unsplashId: "1520523839897-bd0b52f945a0",
    previewPages: ["1520523839897-bd0b52f945a0", "1507838153414-b4b713384a76", "1465821185615-20b3c2fbf41b"],
  },
  {
    id: 2,
    title: "Für Elise",
    composer: "Ludwig van Beethoven",
    instrument: "Piano",
    genre: "Classical",
    price: 2.99,
    difficulty: 2,
    pages: 4,
    youtubeId: "nzRyQjL5U8M",
    unsplashId: "1507838153414-b4b713384a76",
    previewPages: ["1507838153414-b4b713384a76", "1520523839897-bd0b52f945a0"],
  },
  {
    id: 3,
    title: "La Vie en Rose",
    composer: "Édith Piaf arr. Marais",
    instrument: "Violin",
    genre: "Jazz",
    price: 3.99,
    difficulty: 3,
    pages: 3,
    youtubeId: "PIh2xe4jnpk",
    unsplashId: "1465821185615-20b3c2fbf41b",
    previewPages: ["1465821185615-20b3c2fbf41b", "1415886410283-4d0c2de48944"],
  },
  {
    id: 4,
    title: "Gymnopédie No. 1",
    composer: "Erik Satie",
    instrument: "Piano",
    genre: "Classical",
    price: 3.49,
    difficulty: 2,
    pages: 3,
    youtubeId: "S-Xm7s9eGxU",
    unsplashId: "1490375563688-8e5e6f81c8c6",
    previewPages: ["1490375563688-8e5e6f81c8c6", "1507838153414-b4b713384a76"],
  },
  {
    id: 5,
    title: "Summertime",
    composer: "George Gershwin",
    instrument: "Saxophone",
    genre: "Jazz",
    price: 4.49,
    difficulty: 3,
    pages: 5,
    youtubeId: "LNGGFv6aw3c",
    unsplashId: "1415886410283-4d0c2de48944",
    previewPages: ["1415886410283-4d0c2de48944", "1465821185615-20b3c2fbf41b"],
  },
  {
    id: 6,
    title: "Canon in D Major",
    composer: "Johann Pachelbel",
    instrument: "Violin",
    genre: "Baroque",
    price: 3.99,
    difficulty: 3,
    pages: 6,
    youtubeId: "NlprozGcs80",
    unsplashId: "1558618666-fcd25c85cd64",
    previewPages: ["1558618666-fcd25c85cd64", "1465821185615-20b3c2fbf41b"],
  },
  {
    id: 7,
    title: "Bohemian Rhapsody",
    composer: "Freddie Mercury",
    instrument: "Piano",
    genre: "Rock",
    price: 5.99,
    difficulty: 5,
    pages: 12,
    youtubeId: "fJ9rUzIMcZQ",
    unsplashId: "1493225457124-a3eb161ffa5f",
    previewPages: ["1493225457124-a3eb161ffa5f", "1507838153414-b4b713384a76", "1490375563688-8e5e6f81c8c6"],
  },
  {
    id: 8,
    title: "Autumn Leaves",
    composer: "Joseph Kosma",
    instrument: "Guitar",
    genre: "Jazz",
    price: 3.49,
    difficulty: 2,
    pages: 2,
    youtubeId: "r-Z8KuwI7Gc",
    unsplashId: "1511379938547-c1f69419868d",
    previewPages: ["1511379938547-c1f69419868d", "1415886410283-4d0c2de48944"],
  },
  {
    id: 9,
    title: "Moonlight Sonata",
    composer: "Ludwig van Beethoven",
    instrument: "Piano",
    genre: "Classical",
    price: 5.49,
    difficulty: 5,
    pages: 10,
    youtubeId: "4Tr0otuiQuU",
    unsplashId: "1518609878373-06d740f60d8b",
    previewPages: ["1518609878373-06d740f60d8b", "1507838153414-b4b713384a76"],
  },
  {
    id: 10,
    title: "The Four Seasons — Spring",
    composer: "Antonio Vivaldi",
    instrument: "Violin",
    genre: "Baroque",
    price: 4.49,
    difficulty: 4,
    pages: 9,
    youtubeId: "e3G3Kb7MKCY",
    unsplashId: "1606788075519-ead0b7e01e7b",
    previewPages: ["1606788075519-ead0b7e01e7b", "1558618666-fcd25c85cd64"],
  },
];

const GENRE_DATA: GenreDatum[] = [
  { genre: "Classical", count: 847 },
  { genre: "Jazz", count: 512 },
  { genre: "Baroque", count: 334 },
  { genre: "Rock", count: 289 },
  { genre: "Impressionist", count: 198 },
  { genre: "Folk", count: 143 },
];

const CHART_COLORS = ["#d4a843", "#7b68c8", "#4db8a8", "#e07b5a", "#6ba35e", "#c87b9e"];

const INSTRUMENTS = ["All", "Piano", "Violin", "Guitar", "Saxophone"];

const GenreChart = lazy(() => import("./components/GenreChart.tsx"));
const PreviewModal = lazy(() => import("./components/PreviewModal.tsx"));
const YouTubeModal = lazy(() => import("./components/YouTubeModal.tsx"));

// ─── Score Card ───────────────────────────────────────────────────────────────

function ScoreCard({
  score,
  onAddToCart,
  onPreview,
  onWatch,
  inCart,
}: {
  score: Score;
  onAddToCart: (id: number) => void;
  onPreview: (score: Score) => void;
  onWatch: (score: Score) => void;
  inCart: boolean;
}) {
  return (
    <article className="group bg-card border border-border rounded-lg overflow-hidden flex flex-col transition-all hover:border-primary/30 hover:shadow-[0_0_40px_rgba(212,168,67,0.06)]">
      {/* Cover image */}
      <div className="relative overflow-hidden bg-secondary aspect-[4/3]">
        <img
          src={`https://images.unsplash.com/photo-${score.unsplashId}?w=480&h=360&fit=crop&auto=format`}
          alt={`${score.title} score cover`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c14]/90 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span
            className="text-xs font-mono tracking-wider px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: "rgba(212,168,67,0.2)", color: "#d4a843", border: "1px solid rgba(212,168,67,0.3)" }}
          >
            {score.genre.toUpperCase()}
          </span>
          <span className="text-[10px] font-mono text-foreground/60 tracking-wider">
            {score.pages} pp.
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-base font-semibold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {score.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{score.composer}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">{score.instrument}</span>
          <DifficultyMeter level={score.difficulty} />
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <span className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "#d4a843" }}>
            ${score.price.toFixed(2)}
          </span>
          <div className="text-[10px] font-mono text-muted-foreground tracking-wider">PDF + MIDI</div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => onAddToCart(score.id)}
            className="w-full py-2 px-3 rounded text-sm font-medium flex items-center justify-center gap-2 transition-all"
            style={{
              backgroundColor: inCart ? "rgba(212,168,67,0.15)" : "#d4a843",
              color: inCart ? "#d4a843" : "#0d0c14",
              border: inCart ? "1px solid rgba(212,168,67,0.4)" : "1px solid #d4a843",
            }}
          >
            <ShoppingCart size={14} />
            {inCart ? "In Cart" : "Add to Cart"}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onPreview(score)}
              className="py-2 px-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 border border-border bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-foreground transition-all"
            >
              <Star size={12} />
              Preview
            </button>
            <button
              onClick={() => onWatch(score)}
              className="py-2 px-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 border border-border bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-foreground transition-all"
            >
              <Youtube size={12} style={{ color: "#e07b5a" }} />
              Watch
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [query, setQuery] = useState("");
  const [activeInstrument, setActiveInstrument] = useState("All");
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [previewScore, setPreviewScore] = useState<Score | null>(null);
  const [watchScore, setWatchScore] = useState<Score | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ALL_SCORES.filter((s) => {
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.composer.toLowerCase().includes(q) ||
        s.instrument.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q);
      const matchInstrument = activeInstrument === "All" || s.instrument === activeInstrument;
      return matchSearch && matchInstrument;
    });
  }, [query, activeInstrument]);

  const handleAddToCart = (id: number) => {
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const cartTotal = Array.from(cart).reduce((sum, id) => {
    const s = ALL_SCORES.find((s) => s.id === id);
    return sum + (s?.price ?? 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Music size={20} style={{ color: "#d4a843" }} />
            <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              SheetShop
            </span>
          </div>

          {/* Search — center */}
          <div className="flex-1 max-w-md relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
  value={query}
  onChange={(e) => {
    const sanitizedInput = e.target.value
      .replace(/[<>]/g, "")
      .slice(0, 100);

    setQuery(sanitizedInput);
  }}
  placeholder="Search title, composer, instrument…"
  maxLength={100}
  aria-label="Search sheet music"
  className="w-full pl-9 pr-4 py-2 rounded-md text-sm bg-secondary/60 border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={() => setCartOpen((p) => !p)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-secondary/40 hover:bg-secondary text-sm font-medium transition-all"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {cart.size > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: "#d4a843", color: "#0d0c14" }}
              >
                {cart.size}
              </span>
            )}
          </button>
        </div>

        {/* Cart dropdown */}
        {cartOpen && (
          <div className="absolute right-4 top-full mt-1 w-80 bg-popover border border-border rounded-lg shadow-2xl z-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Your Cart</h3>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
            </div>
            {cart.size === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No items yet.</p>
            ) : (
              <>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {Array.from(cart).map((id) => {
                    const s = ALL_SCORES.find((s) => s.id === id)!;
                    return (
                      <div key={id} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium leading-tight">{s.title}</p>
                          <p className="text-xs text-muted-foreground">{s.instrument}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: "#d4a843" }}>${s.price.toFixed(2)}</span>
                          <button onClick={() => handleAddToCart(id)} className="text-muted-foreground hover:text-foreground"><X size={12} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "#d4a843" }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full py-2.5 rounded text-sm font-semibold transition-colors"
                  style={{ backgroundColor: "#d4a843", color: "#0d0c14" }}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* ── Hero Banner ── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=1400&h=320&fit=crop&auto=format"
            alt="Sheet music and piano"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 py-14 md:py-20">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Digital Sheet Music</p>
          <h1
            className="text-4xl md:text-5xl font-semibold leading-tight max-w-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Every Score,<br />
            <em>Instantly Yours.</em>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-sm text-sm leading-relaxed">
            Browse 2,500+ pieces across every genre. Preview before you buy, hear a real performance, then download your PDF in seconds.
          </p>
          <div className="mt-6 flex gap-6 font-mono text-xs tracking-wider text-muted-foreground">
            <span><span className="text-foreground font-semibold text-sm">2,522</span> scores</span>
            <span><span className="text-foreground font-semibold text-sm">340+</span> composers</span>
            <span><span className="text-foreground font-semibold text-sm">18</span> instruments</span>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 space-y-5">
            {/* Instrument filter */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Instrument
              </h3>
              <div className="flex flex-col gap-1">
                {INSTRUMENTS.map((inst) => (
                  <button
                    key={inst}
                    onClick={() => setActiveInstrument(inst)}
                    className="flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all text-left"
                    style={{
                      backgroundColor: activeInstrument === inst ? "rgba(212,168,67,0.12)" : "transparent",
                      color: activeInstrument === inst ? "#d4a843" : "#8a8299",
                      border: activeInstrument === inst ? "1px solid rgba(212,168,67,0.2)" : "1px solid transparent",
                    }}
                  >
                    {inst}
                    <span className="text-xs font-mono">
                      {inst === "All"
                        ? ALL_SCORES.length
                        : ALL_SCORES.filter((s) => s.instrument === inst).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Genre chart */}
            <Suspense
              fallback={
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-4">
                    Catalogue by Genre
                  </h3>
                  <div className="h-[220px] rounded bg-secondary/40 animate-pulse" />
                </div>
              }
            >
              <GenreChart data={GENRE_DATA} colors={CHART_COLORS} />
            </Suspense>

            {/* Difficulty guide */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <h3 className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Difficulty Guide
              </h3>
              {[
                { level: 1, label: "Beginner" },
                { level: 2, label: "Elementary" },
                { level: 3, label: "Intermediate" },
                { level: 4, label: "Advanced" },
                { level: 5, label: "Virtuoso" },
              ].map(({ level }) => (
                <div key={level} className="flex items-center gap-3">
                  <DifficultyMeter level={level} />
                </div>
              ))}
            </div>
          </aside>

          {/* Score grid */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground font-mono">
                {filtered.length} {filtered.length === 1 ? "score" : "scores"}
                {query && ` matching "${query}"`}
                {activeInstrument !== "All" && ` · ${activeInstrument}`}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Music size={32} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">No scores found</p>
                <p className="text-sm mt-1">Try a different search term or instrument</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((score) => (
                  <ScoreCard
                    key={score.id}
                    score={score}
                    onAddToCart={handleAddToCart}
                    onPreview={setPreviewScore}
                    onWatch={setWatchScore}
                    inCart={cart.has(score.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Music size={14} style={{ color: "#d4a843" }} />
            <span className="text-sm font-mono">SheetShop © 2025</span>
          </div>
          <p className="text-xs font-mono text-muted-foreground tracking-wider">
            PDF · MIDI · Instant Download
          </p>
        </div>
      </footer>

      {/* ── Modals ── */}
      {previewScore && (
        <Suspense
          fallback={
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(13,12,20,0.88)", backdropFilter: "blur(8px)" }}
            >
              <div className="bg-card border border-border rounded-lg px-6 py-4 text-sm text-muted-foreground">
                Loading preview...
              </div>
            </div>
          }
        >
          <PreviewModal score={previewScore} onClose={() => setPreviewScore(null)} />
        </Suspense>
      )}
      {watchScore && (
        <Suspense
          fallback={
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(13,12,20,0.92)", backdropFilter: "blur(12px)" }}
            >
              <div className="bg-card border border-border rounded-lg px-6 py-4 text-sm text-muted-foreground">
                Loading video...
              </div>
            </div>
          }
        >
          <YouTubeModal score={watchScore} onClose={() => setWatchScore(null)} />
        </Suspense>
      )}
    </div>
  );
}
