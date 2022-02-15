import "./splash.css";
import { useNavigate, NavLink } from "react-router-dom";
import splashTut from "../images/splashTut.png";
import puzzles from "../images/puzzlees.png";
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
          <a href="https://github.com/kvh8899/slack-clone">
            <i className="fab fa-github"></i> Repository Link
          </a>
          <NavLink to="/About"> Contributors</NavLink>
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
      <div className="midc">
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
        <div className="aboutC">
          <img
            src={splashTut}
            alt="splash"
            style={{
              width: "500px",
              borderRadius: "5px",
              marginRight: "45px",
            }}
          ></img>
        </div>
      </div>
      <div className="features">
        <div className="fTitles">
          <h2>Work more easily with everyone</h2>
          <p>
            Stay on the same page and make decisions faster by bringing all of
            your work communication into one place.
          </p>
          <h2>Features:</h2>
          <div className="featureGrid">
            <div>
              <h3>Live Chat</h3>
              <p>Chat with your Coworkers in real time.</p>
            </div>
            <div>
              <h3>Organizations</h3>
              <p>Create an organization for your workplace.</p>
            </div>
            <div>
              <h3>Channels</h3>
              <p>Create different channels to discuss different topics.</p>
            </div>
            <div>
              <h3>Search</h3>
              <p>Search and Add members to your Organization.</p>
            </div>
            <div>
              <h3>Technologies Used</h3>
              <div className="tech">
                <div>
                  <img
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
                    alt="react"
                    width="40"
                    height="40"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
                    alt="redux"
                    width="40"
                    height="40"
                  />
                </div>
                <div>
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                    alt="js"
                    width="40"
                    height="40"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg"
                    alt="python"
                    width="40"
                    height="40"
                  />
                </div>
                <div>
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg"
                    alt="flask"
                    width="50"
                    height="50"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
                    alt="sql"
                    width="50"
                    height="50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="puzzle">
          <img src={puzzles} alt="puzzle"></img>
        </div>
      </div>
    </div>
  );
}
export default Splash;
