import { removeWorkspace, editOrgThunk } from "../store/organizations";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrg } from "../store/orgmainchat";
import { useParams } from "react-router";
import NewChannel from "../newChannel";
import { useNavigate } from "react-router-dom";
import ChannelList from "../ChannelList";
import { editOrgOn } from "../store/showEditOrg";
import "./messagebar.css";

function MessageBar({ setSelectedChannel, setSelectedChannelId }) {
  const [showChannelList, setShowChannelList] = useState(true);

  const caret = useRef(null);
  const dCaret = useRef(null);
  const size = useRef(null);
  const size1 = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const org = useSelector((state) => state.orgmainchatReducer);
  const session = useSelector((state) => state.session.user);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   formToggle();
  //   setShowEdit(false);
  //   const data = await dispatch(editOrgThunk(orgName, id));

  //   await dispatch(getOrg(id));
  //   if (data) {
  //     return setErrors(data);
  //   }
  // };

  useEffect(() => {
    dispatch(getOrg(id));
  }, []);

  // const editToggle = () => {
  //   if (showForm === true) return;
  //   if (showEdit === false) return setShowEdit(true);
  //   if (showEdit === true) return setShowEdit(false);
  // };

  // const formToggle = () => {
  //   if (showForm === false) {
  //     setShowh2(false);
  //     return setShowForm(true);
  //   } else {
  //     setShowh2(true);
  //     return setShowForm(false);
  //   }
  // };

  // const testRead = (e) => {
  //   e.preventDefault()
  //   dispatch(readChannels(id))
  // }
  // const testDelete = async (e) => {
  //   e.preventDefault()
  //   await dispatch(removeChannel(5, channelName))
  // }
  // const testEdit = async (e) => {
  //   e.preventDefault()
  //   await dispatch(editChannelThunk(id, editChannelName, 7))
  // }

  const orgDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeWorkspace(id));
    navigate("/organization");
  };

  return (
    <>
      <div className="messageBar">
        <div className="title">
          <h2>{org.name}</h2>
          <div
            className="is"
            id="e"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(editOrgOn());
            }}
          >
            <i className="fas fa-ellipsis-v"></i>
          </div>

          {/* {showh2 && <h2>{org.name}</h2>} <i class="fas fa-ellipsis-v"></i>
        {showForm && (
          <div>
            <form className="editorgform" onSubmit={handleSubmit}>
              <input
                type="text"
                ref={input}
                placeholder={"New Name"}
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </form>

          </div>
        )} */}
        </div>
        {/* <div>
        {showEdit && (
          <div className="orgeditdiv">
            <p>Owned by {session?.username}</p>
            <button className="editbutton" onClick={formToggle}>
              Edit Name
            </button>
            <button className="editbutton" onClick={orgDelete}>
              Delete Org
            </button>
          </div>
        )}
      </div> */}
        <div className="channelContent" ref={size}>
          <div class="od">
            <div className="uc" ref={size1}>
              <div className="channels">
                <div>
                  <div
                    onClick={(e) => {
                      caret.current.classList.toggle("side");
                      if (!showChannelList) setShowChannelList(true);
                      if (showChannelList) setShowChannelList(false);
                    }}
                    className="cs"
                  >
                    <div className="is isc">
                      <i className="fas fa-caret-down" ref={caret}></i>
                    </div>

                    <p>Channels</p>
                  </div>
                  <NewChannel />
                </div>
                {/* <div className="ChannelList"> */}
                {showChannelList && (
                  <ChannelList
                    setSelectedChannel={setSelectedChannel}
                    setSelectedChannelId={setSelectedChannelId}
                  />
                )}
                {/* </div> */}
              </div>
              <div className="channels">
                <div>
                  <div
                    onClick={(e) => {
                      dCaret.current.classList.toggle("side");
                    }}
                    className="cs"
                  >
                    <div className="is isc">
                      <i className="fas fa-caret-down" ref={dCaret}></i>
                    </div>
                    <p>Direct Messages</p>
                  </div>
                  <div className="addChannel">
                    <button>
                      <div className="is">
                        <i className="fas fa-plus"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="height"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d"
        onMouseDown={(e) => {
          let drag = true;
          document.addEventListener("mouseup", () => {
            drag = false;
          });
          document.addEventListener("mousemove", (e) => {
            if (e.clientX > 250 && e.clientX < 880 && drag) {
              size.current.style.width = e.clientX + "px";
              size1.current.style.width = e.clientX + "px";
            }
          });
        }}
      ></div>
    </>
  );
}

export default MessageBar;
