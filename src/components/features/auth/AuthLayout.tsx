export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0e12] px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#11161d] p-6 shadow-xl border border-white/5">
        {children}
      </div>
    </div>
  );
}
