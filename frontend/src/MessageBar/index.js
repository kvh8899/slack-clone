import { useEffect } from "react";
import OrgEdit from "../OrgEdit";
import "./messagebar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeWorkspace } from "../store/organizations";
import { useParams } from "react-router";
import { editChannelThunk, postChannel, readChannels, removeChannel } from "../store/channels";

function MessageBar() {
  const [showEdit, setShowEdit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showh2, setShowh2] = useState(true)
  const [channelName, setChannelName] = useState('')
  const [editChannelName, setEditChannelName] = useState('')

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

  // const testRead = (e) => {
  //   e.preventDefault()
  //   dispatch(readChannels(id))
  // }
  // const testCreate = async (e) => {
  //   e.preventDefault()
  //   await dispatch(postChannel(id, channelName))
  // }
  // const testDelete = async (e) => {
  //   e.preventDefault()
  //   await dispatch(removeChannel(5, channelName))
  // }
  // const testEdit = async (e) => {
  //   e.preventDefault()
  //   await dispatch(editChannelThunk(id, editChannelName, 7))
  // }


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
        <div>
          <p>Channels</p>
          {/* <button onClick={testRead}>show all channels</button>
          <form onSubmit={testCreate}>
            <input
              type="text"
              placeholder={"Name"}
              required
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <button>create a channel</button>
          </form>
          <button onClick={testDelete}>delete a channel</button>
          <form onSubmit={testEdit}>
            <input
              type="text"
              placeholder={"Name"}
              required
              value={editChannelName}
              onChange={(e) => setEditChannelName(e.target.value)}
            />
            <button>EDIT a channel</button>
          </form>
 */}
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
