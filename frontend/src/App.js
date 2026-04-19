import "@/App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { Toaster } from "sonner";

function App() {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    const onChange = (e) => setTheme(e.detail);
    window.addEventListener("altura:theme-change", onChange);
    return () => window.removeEventListener("altura:theme-change", onChange);
  }, []);

  return (
    <div className="App font-body bg-brand-ink text-brand-text min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme={theme} position="top-center" richColors closeButton />
    </div>
  );
}

export default App;
