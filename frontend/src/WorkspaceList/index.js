import "./workspacelist.css"
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import {restoreUser} from "../store/session"
function WorkspaceList(){
    const hist = useNavigate();
    // get orgs from database and use map
    const session = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(restoreUser(JSON.parse(window.localStorage.getItem('session'))))
    },[])

    return session?(
        <div className="workSpace-wrap">
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
              <button onClick={() => {
                  //redirect to proper workspace page
                  hist("/")
              }}>LAUNCH ZING</button>
            </div>
          </div>
        </div>
    ):null
}

export default WorkspaceList;