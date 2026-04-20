import { useNavigate } from "react-router-dom"

import Banner from "../components/Banner"

import "../stylesheets/Home.css"


const Home = () => {
    const Navigate = useNavigate();
    
    return <>
    
        <Banner/>

        <hr/>
        
        <main className="home">
            <section>
                <h1>Drachma is the best way to keep track of your finances!</h1>
                <h2>Track your earnings, expenses and savings to have a detailed overview of your financial life. </h2>
            </section>

            <hr/>

            <section className="icons">
                <div className="icon-frame">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M215.62-162q-35.05 0-58.83-23.79Q133-209.57 133-244.62V-834h58v589.38q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69H827v58H215.62Zm98.76-166v-278.31h76V-328h-76Zm184 0v-450.31h76V-328h-76Zm184 0v-130.31h76.01V-328h-76.01Z"/></svg>
                    </div>
                    <p>Track your budget</p>
                </div>
                <div className="icon-frame">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M350.23-152q-80.15 0-138.69-58.54Q153-269.08 153-349.23q0-33.62 10.58-65.23 10.57-31.62 31.5-57.77l133.46-167.69L259.38-808h441.24l-69.16 168.08 134.46 167.69q20.93 26.15 31.5 57.77Q808-382.85 808-349.23q0 80.15-57.65 138.69Q692.69-152 610.77-152H350.23ZM480-329.77q-32.85 0-55.23-22.38-22.39-22.39-22.39-56.23 0-33.85 22.39-56.24Q447.15-487 480-487q33.85 0 56.73 22.38 22.89 22.39 22.89 56.24 0 33.84-22.89 56.23-22.88 22.38-56.73 22.38ZM380.38-664h201L618-751H342l38.38 87Zm-30.15 455h260.54q57.85 0 99.04-41.58Q751-292.15 751-349.23q0-24.54-7-46.58t-22.54-41.57L587.31-607H372.69L240.31-436.62q-15.54 20.54-22.93 41.7-7.38 21.15-7.38 45.69 0 57.08 41.58 98.65Q293.15-209 350.23-209Z"/></svg>
                    </div>
                    <p>Save your money</p>
                </div>
                <div className="icon-frame">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M210-256v-336h58v336h-58Zm240 0v-336h58v336h-58ZM111.54-150v-58h736.92v58H111.54ZM692-256v-336h58v336h-58ZM111.54-640v-79.85L480-901.38l368.46 181.53V-640H111.54Zm88.69-58h559.54-559.54Zm0 0h559.54L480-835 200.23-698Z"/></svg>
                    </div>
                    <p>Build your wealth</p>
                </div>
                <div className="icon-frame">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M224.08-160v-58h512.84v58H224.08Zm-.97-121.38L161.85-586v.88q0-.88-1-.88Q136-586 120-602.91q-16-16.9-16-41.05 0-24.8 16.62-42.03 16.62-17.24 41.39-17.24t42 17.32q17.22 17.32 17.22 42.06 0 5.17-.95 10.86-.94 5.69-4.74 11.91l123.08 51.39 111.84-178.77q-13.77-7.34-21.31-19.99-7.53-12.66-7.53-27.77 0-24.91 17.13-42.34Q455.89-856 480.37-856q24.48 0 41.75 17.39 17.26 17.39 17.26 42.24 0 15.91-7.81 28.62-7.82 12.71-22.03 20.29l112.84 177.77 123.08-51.39q-2.88-5.95-4.28-11.9-1.41-5.94-1.41-10.87 0-24.74 16.58-42.06 16.59-17.32 41.31-17.32 24.31 0 41.32 17.35Q856-668.52 856-643.73q0 24.04-16.78 40.88Q822.44-586 798.47-586q-.52 0 .08.5t.34-.5l-61.66 304.62H223.11Zm47.81-58h419.16l46.07-214.47-136.69 58.93L480-683.85 360.54-494.92l-135.69-58.93 46.07 214.47Zm210.08 0Z"/></svg>
                    </div>
                    <p>Control your life</p>
                </div>
            </section>

            <hr/>

            <section>
                <h1>About Drachma</h1>

                <p className="main-text">Drachma is the ultmate platform for all your finance. It counts with all the features you'd need to manage your wealth and take control of your financial life.</p>

                <div className="buttons">
                    <button className="main-btn" onClick={() => {Navigate("/signup")}}>
                        Create your account 
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M646.15-450H200v-58h446.15L437.46-716.69 479-760l281 281-279 279-41.54-43.31L646.15-450Z"/></svg>
                    </button>

                    <button className="secondary-btn" onClick={() => {Navigate("/login")}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M479.23-152v-58h246.15q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-490.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H479.23v-58h246.15q35.05 0 58.83 23.79Q808-760.43 808-725.38v490.76q0 35.05-23.79 58.83Q760.43-152 725.38-152H479.23Zm-54.46-178.46-45.08-41.77L459.46-452H152v-58h307.46l-79.77-79.77 45.08-39.77L574.31-480 424.77-330.46Z"/></svg>
                        Log In
                    </button>
                </div>

            </section>

            <hr/>

        </main>
    
    </>
    
}

export default Home