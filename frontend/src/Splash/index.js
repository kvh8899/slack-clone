import './splash.css'
import {useNavigate} from "react-router-dom"
function Splash(){
    const hist = useNavigate();
    return (
        <div className="wrapper">
            <nav>
                <div className="leftNav"> 
                    <img src="./zinglogo.png" alt="logo"></img>
                    <h2>Zing</h2>
                </div>
                <div className="rightNav">
                    <button id="search">Search</button>
                    <button id="signin" onClick={() => {
                        hist("/login");
                    }}>SIGN IN</button>
                </div>
            </nav>
            <div className="titleContent">
                <h1>Join a Community</h1>
                <p>Transform the way you work with one place for everyone and everything you need to get stuff done.</p>
                <button onClick={() => {
                    hist("signup");
                }}>Try For Free</button>
            </div>
        </div>
    )
}
export default Splash;