import "./splash.css";
import { useNavigate, NavLink } from "react-router-dom";
function Splash() {
  const hist = useNavigate();
  return (
    <div className="wrapper">
      <nav>
        <div className="leftNav">
          <img
            src="https://cdn.discordapp.com/attachments/919391399269515305/930910536839864351/zinglogo.png"
            alt="logo"
          ></img>
          <h2>Zing</h2>
        </div>
        <div className="rightNav">
          <NavLink to="/About"> About </NavLink>
          <button
            id="signin"
            onClick={() => {
              hist("/login");
            }}
          >
            SIGN IN
          </button>
        </div>
      </nav>
        <div className="titleContent">
          <h1>Join a Community</h1>
          <p>
            Transform the way you work with one place for everyone and
            everything you need to get stuff done.
          </p>
          <button
            onClick={() => {
              hist("/signup");
            }}
          >
            Try For Free
          </button>
        </div>
        
      </div>
  );
}
export default Splash;
