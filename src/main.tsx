import "./index.css";  // global Tailwind + custom styles
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";  // includes Navbar + Footer
import Store from "./pages/Store";
import Categories from "./pages/Categories";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,   // always wraps pages
    children: [
      { index: true, element: <Store /> },
      { path: "categories", element: <Categories /> },
      { path: "recommendations", element: <Recommendations /> },
      { path: "about", element: <About /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
