export default function QuantityPicker({
  value, onChange, disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center rounded bg-white/10 select-none">
      <button disabled={disabled} className="px-2 py-1 hover:bg-white/10 disabled:opacity-50"
              onClick={() => onChange(Math.max(0, value - 1))}>−</button>
      <span className="px-3 py-1 min-w-[2ch] text-center">{value}</span>
      <button disabled={disabled} className="px-2 py-1 hover:bg-white/10 disabled:opacity-50"
              onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
