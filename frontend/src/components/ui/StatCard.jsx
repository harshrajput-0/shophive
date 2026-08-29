export function StatCard({ label, value }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-[14px] border border-border-strong p-6 text-left">
      <span className="text-[0.85rem] font-semibold text-text-secondary">{label}</span>

      <span className="font-display text-[2.4rem] font-bold text-primary">{value}</span>
    </div>
  );
}
