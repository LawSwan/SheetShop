function DifficultyMeter({ level }: { level: number }) {
  const labels = ["", "Beginner", "Elementary", "Intermediate", "Advanced", "Virtuoso"];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[3px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-[7px] rounded-sm transition-all"
            style={{
              backgroundColor:
                i < level
                  ? level <= 2
                    ? "#6ba35e"
                    : level === 3
                      ? "#d4a843"
                      : "#e07b5a"
                  : "rgba(242,237,228,0.12)",
            }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
        {labels[level]}
      </span>
    </div>
  );
}

export default DifficultyMeter;
