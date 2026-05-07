import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import type { CurrencyCode } from "../Types"

type Theme = "light" | "dark"

export type UserPreferences = {
    theme: Theme
    currency: CurrencyCode
}

type UserPreferencesContextType = {
    preferences: UserPreferences
    theme: Theme
    currency: CurrencyCode
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
    setCurrency: (currency: CurrencyCode) => void
}

const DEFAULTS: UserPreferences = { theme: "light", currency: "BRL" }
const LIGHT_ONLY_ROUTES = ["/", "/login", "/signup"]
const LS_KEY = "user_preferences"

function loadFromStorage(): UserPreferences {
    try {
        const raw = localStorage.getItem(LS_KEY)
        if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
    } catch {}
    // migrate legacy "theme" key
    const legacy = localStorage.getItem("theme") as Theme | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    return {
        theme: legacy === "dark" || legacy === "light" ? legacy : (prefersDark ? "dark" : "light"),
        currency: "BRL",
    }
}

const UserPreferencesContext = createContext<UserPreferencesContextType | null>(null)

export const UserPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation()
    const [preferences, setPreferences] = useState<UserPreferences>(loadFromStorage)

    // Sync with Supabase on mount and on auth state changes
    useEffect(() => {
        const sync = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data } = await supabase
                .from("user_preferences")
                .select("theme, currency")
                .eq("user_id", user.id)
                .maybeSingle()

            if (data) {
                const remote: UserPreferences = { theme: data.theme as Theme, currency: data.currency as CurrencyCode }
                setPreferences(remote)
                localStorage.setItem(LS_KEY, JSON.stringify(remote))
            } else {
                // First login — seed the row with whatever is already in localStorage
                await supabase.from("user_preferences").upsert({ user_id: user.id, ...preferences })
            }
        }

        sync()

        const { data: listener } = supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") sync()
            if (event === "SIGNED_OUT") setPreferences(DEFAULTS)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    // Apply dark-mode class and persist to localStorage on every preference change
    useEffect(() => {
        const root = document.documentElement
        const isLightOnly = LIGHT_ONLY_ROUTES.some(r =>
            location.pathname === r || location.pathname.startsWith(r + "/")
        )
        if (preferences.theme === "dark" && !isLightOnly) {
            root.classList.add("dark-mode")
        } else {
            root.classList.remove("dark-mode")
        }
        localStorage.setItem(LS_KEY, JSON.stringify(preferences))
    }, [preferences, location.pathname])

    const persist = async (updated: UserPreferences) => {
        setPreferences(updated)
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            await supabase.from("user_preferences").upsert({ user_id: user.id, ...updated })
        }
    }

    const setTheme = (theme: Theme) => persist({ ...preferences, theme })
    const toggleTheme = () => setTheme(preferences.theme === "dark" ? "light" : "dark")
    const setCurrency = (currency: CurrencyCode) => persist({ ...preferences, currency })

    return (
        <UserPreferencesContext.Provider value={{
            preferences,
            theme: preferences.theme,
            currency: preferences.currency,
            toggleTheme,
            setTheme,
            setCurrency,
        }}>
            {children}
        </UserPreferencesContext.Provider>
    )
}

export const useUserPreferences = () => {
    const ctx = useContext(UserPreferencesContext)
    if (!ctx) throw new Error("useUserPreferences must be used inside UserPreferencesProvider")
    return ctx
}

// Backward-compat alias so existing useTheme imports keep working
export const useTheme = () => {
    const { theme, toggleTheme, setTheme } = useUserPreferences()
    return { theme, toggleTheme, setTheme }
}
