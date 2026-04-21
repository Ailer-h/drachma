import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return <>
        <main className="pageNotFound">
            <div>
                <h1>404: <span>Page not found</span></h1>
                <h2>Seems like you're a little lost lost...</h2>
                <h3 onClick={() => { Navigate("/") }} >Go back home.</h3>
            </div>
            <img src="src/assets/athena.png" height={700}/>
            <img src="src/assets/olive_branch.png" className="backdrop" height={900}/>
        </main>
    </>

}

export default PageNotFound