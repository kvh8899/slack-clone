import "./workspacelist.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { editOrg, workspaces } from "../store/organizations";
function WorkspaceList() {
  const hist = useNavigate();
  // get orgs from database and use map
  const session = useSelector((state) => state.session.user);
  const organizations = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  async function loadOrg(session) {
    if (session) {
      await dispatch(workspaces(session.id));
    }
  }
  useEffect(() => {
    loadOrg(session);
  }, [session]);
  return session ? (
    <div className="workSpace-wrap">
      <div className="workSpace-wrap">
        <h3>Workspaces for {session.email}</h3>
        {organizations ? organizations.map((e) => {
          return (
            <div className="orgData" key={e.id}>
              <img
                src="https://avatars.slack-edge.com/2015-03-13/4045125376_172ec0a9d33356de3571_88.jpg"
                alt="logo"
              ></img>
              <div>
                <h3>{e.name}</h3>
                <p>{e.members.length} Members</p>
              </div>
              <button
                onClick={() => {
                  //redirect to proper workspace page
                  hist(`/organizations/${e.id}`);
                }}
              >
                LAUNCH ZING
              </button>
            </div>
          );
        }) : null}
      </div>
    </div>
  ) : null;
}

export default WorkspaceList;
