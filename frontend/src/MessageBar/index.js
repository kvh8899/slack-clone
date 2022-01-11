
import OrgEdit from "../OrgEdit";
import { editOrg, getOrg } from "../store/orgmainchat";
import {useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router";
import {useEffect} from  "react";
import "./messagebar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { removeWorkspace } from "../store/organizations";


function MessageBar() {
  const [showEdit, setShowEdit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showh2, setShowh2] = useState(true)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const org = useSelector(state => state.orgmainchatReducer);

  useEffect(() => {
    dispatch(getOrg(id))
  },[])
  const editToggle = () => {
    if (showForm === true) return
    if (showEdit === false) return setShowEdit(true)
    if (showEdit === true) return setShowEdit(false)
  }
  const formToggle = () => {
    if (showForm === false) {
      setShowh2(false)
      return setShowForm(true)
    } else {
      setShowh2(true)
      return setShowForm(false)
    }
  }

  const orgDelete = (e) => {
    e.preventDefault()
    dispatch(removeWorkspace(id))
    navigate('/organization')
  }

  return (
    <div className="messageBar">
      <div onClick={editToggle} className="title">
        {showh2 &&
          <h2 >{org.name}</h2>
        }
        {showForm &&
          <div>
            <OrgEdit setShowForm={setShowForm} setShowh2={setShowh2} />
          </div>
        }
      </div>
      <div>
        {showEdit &&
          <div className="orgeditdiv">
            <p>Owned by INSERTOWNER</p>
            <button className="editbutton" onClick={formToggle}>Edit Name</button >
            <button className="editbutton" onClick={orgDelete}>Delete Org</button>
          </div>
        }
        <div>
          <p>Channels</p>
        </div>
      </div>
      <div>
        <div>
          <p>Direct Messages</p>
        </div>
      </div>
    </div >
  );
}

export default MessageBar
