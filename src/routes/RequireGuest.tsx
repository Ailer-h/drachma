'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"

interface Props {
    children: React.ReactNode
}

const RequireGuest = ({ children }: Props) => {
    const { session, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && session) {
            router.replace("/dashboard")
        }
    }, [loading, session, router])

    if (loading || session) return null // ADD SPINNER LATER

    return <>{children}</>
}

export default RequireGuest
