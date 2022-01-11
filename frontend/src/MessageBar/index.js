import { useEffect } from "react";
import OrgEdit from "../OrgEdit";
import "./messagebar.css";
import {useRef} from "react"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeWorkspace } from "../store/organizations";
import { useParams } from "react-router";

function MessageBar() {
  const [showEdit, setShowEdit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showh2, setShowh2] = useState(true)
  const caret = useRef(null);
  const dCaret = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()

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
          <h2 >Title</h2>
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
      </div>
       <div className="channels">
        <div onClick={(e) => {
              caret.current.classList.toggle("side");
            }}>
          <i
            className="fas fa-caret-down"
            ref={caret}
          ></i>
          <p>Channels</p>
        </div>
      </div>
      <div className="channels">
        <div onClick={(e) => {
              dCaret.current.classList.toggle("side");
            }}>
          <i
            className="fas fa-caret-down"
            ref={dCaret}
          ></i>
          <p>Direct Messages</p>
        </div>
      </div>
    </div >
  );
}

export default MessageBar;
