export default function SummaryCard({ label, value, note, tone }) {
  return (
    <section className={`summary-card card border-0 h-100 summary-${tone}`}>
      <div className="card-body p-4">
        <p className="summary-label mb-2">{label}</p>
        <p className="summary-value mb-1">{value}</p>
        <p className="summary-note mb-0">{note}</p>
      </div>
    </section>
  );
}
