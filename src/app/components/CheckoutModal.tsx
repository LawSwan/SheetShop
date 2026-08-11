import { useState } from "react";
import { X, Loader2, CheckCircle2, Download } from "lucide-react";
import type { Score } from "../types.ts";

function CheckoutModal({
  items,
  onClose,
  onComplete,
}: {
  items: Score[];
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<"review" | "processing" | "success">("review");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const total = items.reduce((sum, s) => sum + s.price, 0);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setOrderNumber(`SS-${Date.now().toString().slice(-6)}`);
      setStep("success");
      onComplete();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(13,12,20,0.9)", backdropFilter: "blur(10px)" }}
      onClick={(e) => step !== "processing" && e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {step === "success" ? "Order Confirmed" : "Checkout"}
          </h2>
          {step !== "processing" && (
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {step === "review" && (
          <form onSubmit={handlePay} className="p-5 space-y-4">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium leading-tight">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.instrument}</p>
                  </div>
                  <span style={{ color: "#d4a843" }}>${s.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "#d4a843" }}>
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 rounded-md text-sm bg-secondary/60 border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground block mb-1.5">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    className="w-full px-3 py-2 rounded-md text-sm bg-secondary/60 border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground block mb-1.5">
                    Expiry
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 rounded-md text-sm bg-secondary/60 border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground block mb-1.5">
                    CVC
                  </label>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 rounded-md text-sm bg-secondary/60 border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground text-center pt-1">
              Demo checkout — no real payment is processed.
            </p>

            <button
              type="submit"
              className="w-full py-2.5 rounded text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#d4a843", color: "#0d0c14" }}
            >
              Pay ${total.toFixed(2)}
            </button>
          </form>
        )}

        {step === "processing" && (
          <div className="p-10 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 size={28} className="animate-spin" style={{ color: "#d4a843" }} />
            <p className="text-sm">Processing payment…</p>
          </div>
        )}

        {step === "success" && (
          <div className="p-5 space-y-5">
            <div className="flex flex-col items-center text-center gap-2 py-2">
              <CheckCircle2 size={40} style={{ color: "#6ba35e" }} />
              <p className="text-sm text-muted-foreground">
                Order <span className="font-mono text-foreground">{orderNumber}</span> confirmed.
                A receipt was sent to {email}.
              </p>
            </div>

            <div className="space-y-2">
              {items.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between text-sm border border-border rounded-md px-3 py-2.5"
                >
                  <div>
                    <p className="font-medium leading-tight">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.composer}</p>
                  </div>
                  <button
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded border border-border bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-foreground transition-all"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Download size={12} />
                    PDF + MIDI
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#d4a843", color: "#0d0c14" }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
