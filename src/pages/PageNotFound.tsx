import { useEffect } from "react";

const PageNotFound = () => {

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return <>
        <main className="pageNotFound">
            <div>
                <h1>404: Page not found</h1>
                <h2>Seems like you're a little lost lost...</h2>
            </div>
            <img src="src/assets/athena.png" height={"700"}/>
        </main>
    </>

}

export default PageNotFound