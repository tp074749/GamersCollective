function SlideProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute left-6 right-6 bottom-6 h-1.5 bg-white/20 rounded-full overflow-hidden">
      <div
        className="h-full bg-white/80 transition-[width] duration-150"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
}
export default SlideProgressBar;