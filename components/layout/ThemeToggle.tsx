"use client";

import { useSyncExternalStore } from "react";
import { Sun, Leaf, Moon } from "lucide-react";

export type Theme = "light" | "emerald" | "dark";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "emerald";
  const saved = localStorage.getItem("edu-theme") as Theme | null;
  return saved || "emerald";
}

function getServerSnapshot(): Theme {
  return "emerald";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const changeTheme = (newTheme: Theme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem("edu-theme", newTheme);
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  return (
    <div
      role="group"
      aria-label="Selector de modo de color"
      className={`inline-flex items-center gap-0.5 rounded-full border border-line/60 bg-surface/80 p-0.5 backdrop-blur-md shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => changeTheme("light")}
        aria-label="Modo claro"
        aria-pressed={theme === "light"}
        title="Modo Claro"
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          theme === "light"
            ? "bg-accent text-white shadow-xs"
            : "text-muted hover:text-ink"
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={() => changeTheme("emerald")}
        aria-label="Modo verde esmeralda"
        aria-pressed={theme === "emerald"}
        title="Modo Esmeralda"
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          theme === "emerald"
            ? "bg-accent text-white font-semibold shadow-xs"
            : "text-muted hover:text-ink"
        }`}
      >
        <Leaf className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={() => changeTheme("dark")}
        aria-label="Modo oscuro"
        aria-pressed={theme === "dark"}
        title="Modo Oscuro"
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          theme === "dark"
            ? "bg-accent text-white shadow-xs"
            : "text-muted hover:text-ink"
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
