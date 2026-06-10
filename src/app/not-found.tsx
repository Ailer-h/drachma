'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLayoutContext } from "../context/LayoutContext"
import Image from "next/image"
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
            <Image src={athena} alt="Athena" height={700} width={0} style={{ width: "auto" }} />
            <Image src={oliveBranch} alt="" className="backdrop" height={900} width={0} style={{ width: "auto" }} />
        </main>
    </>

}

export default PageNotFound
