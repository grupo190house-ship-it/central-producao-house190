import type { StatusTone } from "@/lib/data";

export function StatCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: StatusTone }) {
  return (
    <article className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-top">
        <span>{label}</span>
        <span className="stat-dot" aria-hidden="true" />
      </div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
