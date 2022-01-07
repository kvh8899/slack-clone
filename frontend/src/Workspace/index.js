import "./workspace.css";
import { Link } from "react-router-dom";
function Workspace() {
  return (
    <div className="workspace-wrapper">
      <nav>
        <div className="leftNav">
          <img src="./zinglogo.png" alt="logo"></img>
          <h2>Zing</h2>
        </div>
        <div className="rightNav">
          <button id="create" onClick={() => {}}>
            CREATE A NEW WORKSPACE
          </button>
        </div>
      </nav>
      <div className="midContent">
        <h2>
          <img
            src="https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand@2x.gif"
            alt="emoji"
          ></img>
          Welcome Back!
        </h2>
        {/*"here for testing visuals. Change to component"*/}
        <div>
          <div className="workSpace-wrap">
            <h3>Workspaces for {"example@gmail.com"}</h3>
            <div className="orgData">
              <img
                src="https://avatars.slack-edge.com/2015-03-13/4045125376_172ec0a9d33356de3571_88.jpg"
                alt="logo"
              ></img>
              <div>
                <h3>App Academy</h3>
                <p>5299 Members</p>
              </div>
              <button>LAUNCH ZING</button>
            </div>
          </div>
        </div>
        <div className="createOrg">
          <img src="/laptopPerson.png" alt="person"></img>
          <span></span>
          <div>
            <p>Want to use Zing with a different Team?</p>
            <button>Create a New Workspace</button>
          </div>
        </div>
        <p>Not Seeing your workspace?{<Link to="/login">Try using a different Email</Link>}</p>
      </div>
    </div>
  );
}

export default Workspace;
