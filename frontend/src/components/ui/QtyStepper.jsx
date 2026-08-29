import { Minus, Plus } from "lucide-react";

const stepBtn =
  "flex size-9 shrink-0 items-center justify-center bg-transparent text-text border border-border-strong [clip-path:polygon(25%_4%,75%_4%,100%_50%,75%_96%,25%_96%,0%_50%)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

export function QtyStepper({ value, onDec, onInc, min = 1, max = Infinity }) {
  return (
    <div className="flex items-center gap-3.5">
      <button
        className={stepBtn}
        onClick={onDec}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>

      <span className="min-w-5 text-center text-[1.05rem] font-bold font-display">{value}</span>

      <button
        className={stepBtn}
        onClick={onInc}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
