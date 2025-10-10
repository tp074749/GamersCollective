import React, { useEffect } from "react";
import { LRBtn } from "../../ui/LRButton";

export function Lightbox({
  open,
  src,
  onClose,
  onPrev,
  onNext,
}: {
  open: boolean;
  src: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <img
        src={src}
        alt=""
        className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute top-3 right-3">
        <button
          onClick={onClose}
          className="rounded bg-white/10 px-3 py-1 text-white hover:bg-white/20"
        >
          Close ✕
        </button>
      </div>
      <LRBtn onClick={(e: React.MouseEvent) => { e.stopPropagation(); onPrev(); }} label="Previous" side="left" />
      <LRBtn onClick={(e: React.MouseEvent) => { e.stopPropagation(); onNext(); }} label="Next" side="right" />
    </div>
  );
}
