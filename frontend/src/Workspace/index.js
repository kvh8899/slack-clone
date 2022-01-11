import "./workspace.css";
import { useNavigate, Link, NavLink } from "react-router-dom";
import WorkspaceList from "../WorkspaceList";
import {useSelector} from "react-redux";

function Workspace() {
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  return (
    <div className="workspace-wrapper">
      <nav>
        <div className="leftNav">
          <img src="./zinglogo.png" alt="logo"></img>
          <h2>Zing</h2>
        </div>
        <div className="rightNav">
          <NavLink to={`/users/${session.id}/organizations`}>
            <button id="create" onClick={() => {}}>
              CREATE A NEW WORKSPACE
            </button>
          </NavLink>
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
        <WorkspaceList />
        <div className="createOrg workSpace-wrap">
          <img src="/laptopPerson.png" alt="person"></img>
          <span></span>
          <div>
            <p>Want to use Zing with a different Team?</p>
            <NavLink to={`/users/${session.id}/organizations`}>
              <button>Create a New Workspace</button>
            </NavLink>
          </div>
        </div>
        <div className="logins">
          Not Seeing your workspace?
          {<Link to="/login">Try using a different Email →</Link>}
        </div>
      </div>
    </div>
  );
}

export default Workspace;
