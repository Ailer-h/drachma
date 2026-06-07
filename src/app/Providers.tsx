'use client'
import { AuthProvider } from '../context/AuthContext'
import { UserPreferencesProvider } from '../context/UserPreferencesContext'
import { LayoutProvider } from '../context/LayoutContext'
import Layout from '../Layout'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <UserPreferencesProvider>
                <LayoutProvider>
                    <Layout>{children}</Layout>
                </LayoutProvider>
            </UserPreferencesProvider>
        </AuthProvider>
    )
}
