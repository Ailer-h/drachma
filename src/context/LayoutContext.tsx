'use client'
import { createContext, useContext, useState } from "react"

const LayoutContext = createContext<{
    hideLayout: boolean
    setHideLayout: (v: boolean) => void
}>({ hideLayout: false, setHideLayout: () => {} })

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [hideLayout, setHideLayout] = useState(false)
    return (
        <LayoutContext.Provider value={{ hideLayout, setHideLayout }}>
            {children}
        </LayoutContext.Provider>
    )
}

export const useLayoutContext = () => useContext(LayoutContext)
