// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Theme = "light" | "dark";
const LIGHT_ONLY_ROUTES = ["/", "/login", "/signup"];

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem("theme") as Theme | null;

        if (stored === "dark" || stored === "light") {
            return stored;
        }

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    });

    // Apply class + persist
    useEffect(() => {
        const root = document.documentElement;

        const isLightOnly = LIGHT_ONLY_ROUTES.some(route =>
            location.pathname === route || location.pathname.startsWith(route + "/")
        );

        if (theme === "dark" && !isLightOnly) {
            root.classList.add("dark-mode");
        } else {
            root.classList.remove("dark-mode");
        }

        localStorage.setItem("theme", theme);
    }, [theme, location.pathname]);

    const toggleTheme = () => {
        setThemeState(prev => (prev === "dark" ? "light" : "dark"));
    };

    const setTheme = (theme: Theme) => {
        setThemeState(theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used inside ThemeProvider");
    return context;
};