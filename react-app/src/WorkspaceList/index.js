import "./workspacelist.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWorkspaces } from "../store/organizations";
import { readChannels } from "../store/channels";
import{setName} from "../store/currentChannel"
import {getSocket} from '../store/socket'
function WorkspaceList() {
  const hist = useNavigate();
  // get orgs from database and use map
  const session = useSelector((state) => state.session.user);
  const organizations = useSelector((state) => state.organizations);
  const socket = useSelector((state) => state.socket)
  const dispatch = useDispatch();

  async function loadOrg(session) {
    if (session) {
      await dispatch(getWorkspaces(session.id));
    }
  }
  useEffect(() => {
    loadOrg(session);
  }, [session]);
  useEffect(() => {
      dispatch(getSocket());
  },[])
  return session ? (
    <div className="workSpace-wrap">
      <div className="workSpace-wrap">
        <h3>Workspaces for {session.email}</h3>
        {organizations ? organizations.map((e) => {
          return (
            <div className="orgData" key={e.id}>
              <img
                // src="https://avatars.slack-edge.com/2015-03-13/4045125376_172ec0a9d33356de3571_88.jpg"
                src="https://cdn.discordapp.com/attachments/919391399269515305/930910536193933312/aa_logo.png"
                alt="logo"
              ></img>
              <div>
                <h3>{e?.name}</h3>
                <p>{e?.members?.length} Members</p>
              </div>
              <button
                onClick={async() => {
                  //redirect to proper workspace page
                  const channels = await dispatch(readChannels(e?.id));
                  socket.emit("joinserver",{organization:e?.id})
                  socket.emit("joinroom",{channelId:channels.channels[0].id})
                  dispatch(setName(channels.channels[0].name))
                  hist(`/organizations/${e?.id}/channels/${channels.channels[0].id}`);
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
