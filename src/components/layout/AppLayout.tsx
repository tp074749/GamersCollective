import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
    return (
        <>
            <Navbar />
            <main className="main" style ={{ padding: "1rem" }}>
                <Outlet />
            </main>
            <footer className="footer">© 2025 GameStore. All rights reserved.</footer>
        </>
    );
}