import { useNavigate } from "react-router-dom"

import "../stylesheets/Navbar.css"

interface NavbarProps {
    type: string
}


const Navbar = ({type}: NavbarProps) => {

    const Navigate = useNavigate();

    return <>
            <nav className={type}>
                <h1>Drachma</h1>

                {
                    type == "start" &&
                    <div>
                        <p>About Drachma</p>
                        <button onClick={() => {Navigate("/login")}}>Log In</button>
                    </div>
                }

                {
                    type == "main" &&
                    <div className="menu">

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M166.15-274.15v-36.93h627.7v36.93h-627.7Zm0-187.7v-36.92h627.7v36.92h-627.7Zm0-187.69v-36.92h627.7v36.92h-627.7Z"/></svg>
                                Menu
                        </button>
                    </div>
                }

                
            </nav>
        </>
}

export default Navbar