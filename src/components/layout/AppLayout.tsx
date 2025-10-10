import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0b0e12] text-white">
      <Navbar />
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <footer className="flex justify-center">© 2025 GameStore. All rights reserved.</footer>
    </div>
  );
}