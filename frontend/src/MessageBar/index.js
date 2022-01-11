import "./messagebar.css";
import { editOrg, getOrg } from "../store/orgmainchat";
import {useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router";
import {useEffect} from  "react";
function MessageBar() {
  const dispatch = useDispatch();
  const org = useSelector(state => state.orgmainchatReducer)
  const {id} = useParams();
  useEffect(() => {
    dispatch(getOrg(id))
  },[])
  return (
    <div className="messageBar">
      <div className="title">
        <h2>Title</h2>
        <div>
          <button>New</button>
        </div>
      </div>
      <div>
        <div>
          <p>Channels</p>
        </div>
      </div>
      <div>
        <div>
          <p>Direct Messages</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBar
