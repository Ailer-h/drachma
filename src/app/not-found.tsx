'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLayoutContext } from "../context/LayoutContext"
import athena from "../assets/athena.png"
import oliveBranch from "../assets/olive_branch.png"

const PageNotFound = () => {
    const router = useRouter()
    const { setHideLayout } = useLayoutContext()

    useEffect(() => {
        setHideLayout(true)
        document.body.style.overflow = "hidden"

        return () => {
            setHideLayout(false)
            document.body.style.overflow = "auto"
        }
    }, [])

    return <>
        <main className="pageNotFound">
            <div>
                <h1>404: <span>Page not found</span></h1>
                <h2>Seems like you're a little lost...</h2>
                <h3 onClick={() => { router.push("/dashboard") }} >Go back home.</h3>
            </div>
            <img src={athena.src} height={700}/>
            <img src={oliveBranch.src} className="backdrop" height={900}/>
        </main>
    </>

}

export default PageNotFound
