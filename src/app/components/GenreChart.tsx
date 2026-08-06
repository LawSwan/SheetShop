import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { GenreDatum } from "../types.ts";

function GenreChart({ data, colors }: { data: GenreDatum[]; colors: string[] }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-4">
        Catalogue by Genre
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="genre"
            tick={{ fill: "#8a8299", fontSize: 11, fontFamily: "DM Mono, monospace" }}
            tickLine={false}
            axisLine={false}
            width={92}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1a2e",
              border: "1px solid rgba(242,237,228,0.08)",
              borderRadius: "4px",
              color: "#f2ede4",
              fontSize: "12px",
              fontFamily: "DM Mono, monospace",
            }}
            formatter={(v: number) => [v + " scores", ""]}
            cursor={{ fill: "rgba(242,237,228,0.03)" }}
          />
          <Bar dataKey="count" radius={[0, 3, 3, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenreChart;
