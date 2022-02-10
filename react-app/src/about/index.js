import { NavLink } from "react-router-dom";
import "./about.css";
function About() {
  return (
    <div className="cardGrid">
      <div className="aboutNav">
        <NavLink to="/">Back</NavLink>
      </div>
      <h2> This website was made by:</h2>
      <div className="aboutData">
        <div className="card">
          <div>
            <img
              src="https://preview.redd.it/76glbq4o1sn51.png?width=440&format=png&auto=webp&s=a22610bfbd735d024448389fd80009b255c33524"
              alt=""
            ></img>
            <h3>Dylan</h3>
            <div>
              <a href="https://github.com/DylanWelzel" target="_blank">Dylan's Github</a>
              <a href="https://github.com/DylanWelzel" target="_blank">
                <i className="fas fa-long-arrow-alt-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="card">
          <div>
            <img
              src="https://preview.redd.it/xprpkp063sn51.png?width=440&format=png&auto=webp&s=5d51eb262af4a50e8f935218feb52682540aa525"
              alt=""
            ></img>
            <h3>Fady</h3>
            <div>
              <a href="https://github.com/Felmallakh" target="_blank">Fady's Github</a>
              <a href="https://github.com/Felmallakh" target="_blank">
                <i className="fas fa-long-arrow-alt-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="card">
          <div>
            <img
              src="https://preview.redd.it/iio3xm4o1sn51.png?width=440&format=png&auto=webp&s=2b9fb1b29396502998feda5c6ed2ed75919c6ad8"
              alt=""
            ></img>
            <h3>Enoch</h3>
            <div>
              <a href="https://github.com/enochtan17" target="_blank">Enoch's Github</a>
              <a href="https://github.com/enochtan17" target="_blank"><i className="fas fa-long-arrow-alt-right"></i></a>
            </div>
          </div>
        </div>
        <div className="card">
          <div>
            <img
              src="https://preview.redd.it/an871k4o1sn51.png?width=440&format=png&auto=webp&s=85dcd6cb73b8760802e254ee14dfa3c7ab444591"
              alt=""
            ></img>
            <h3>Kyle</h3>
            <div>
              <a href="https://github.com/kvh8899" target="_blank">Kyle's Github</a>
              <a href="https://github.com/kvh8899" target="_blank"><i className="fas fa-long-arrow-alt-right"></i></a>
            </div>
          </div>
        </div>
        <a className ="githubs" href="https://github.com/kvh8899/slack-clone" target="_blank"><i className="fab fa-github"></i> Repository Link</a>
      </div>
    </div>
  );
}

export default About;
