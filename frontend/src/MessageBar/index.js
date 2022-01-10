import { useEffect } from "react";
import OrgEdit from "../OrgEdit";
import "./messagebar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeWorkspace } from "../store/organizations";
import { useParams } from "react-router";

function MessageBar() {
  const [showEdit, setShowEdit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()

  const editToggle = () => {
    if (showEdit === false) return setShowEdit(true)
    if (showEdit === true) return setShowEdit(false)
  }

  const formToggle = () => {
    if (showForm === false) return setShowForm(true)
    if (showForm === true) return setShowForm(false)
  }
  console.log(showEdit)
  const orgDelete = (e) => {
    e.preventDefault()
    dispatch(removeWorkspace(id))
    navigate('/organization')
  }
  return (
    <div className="messageBar">
      <div className="title">
        <h2 onClick={editToggle}>Title</h2>
        {showEdit &&
          <div className="orgeditdiv">
            <button className="editbutton" onClick={formToggle}>Edit Name</button>
            <button className="editbutton" onClick={orgDelete}>Delete Org</button>
          </div>
        }
        <div>
          <button>New</button>
        </div>
      </div>
      <div>
        <div>
          {showForm &&
            <div>
              <OrgEdit setShowForm={setShowForm} />
            </div>
          }
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
