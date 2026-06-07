'use client'
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabaseClient"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setLoading(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
            if (event === "SIGNED_OUT") {
                router.push("/")
            }
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
