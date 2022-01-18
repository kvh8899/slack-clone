import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrg } from "../store/orgmainchat";
import { useParams, useNavigate } from "react-router";
import NewChannel from "../newChannel";
import ChannelList from "../ChannelList";
import NewMember from "../NewMember";
import { editOrgOn } from "../store/showEditOrg";
import { removeMember } from "../store/orgmainchat";

import "./messagebar.css";

function MessageBar({ setSelectedChannel, setSelectedChannelId }) {
  const [showChannelList, setShowChannelList] = useState(true);
  const [deleteMember, setDeleteMember] = useState("");
  const [showMemberList, setshowMemberList] = useState(true);

  const caret = useRef(null);
  const dCaret = useRef(null);
  const mCaret = useRef(null);
  const size = useRef(null);
  const size1 = useRef(null);
  const msgBar = useRef(null);
  const d = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const org = useSelector((state) => state.orgmainchatReducer);
  const session = useSelector((state) => state.session.user)
  const members = org.members;
  const ownerId = org.owner_id
  const hist = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deleteMember === ownerId) return alert(`You cannot remove the owner of the Organization`)
    await dispatch(removeMember(deleteMember, org.id));
  };
  async function loadData(){
    const org = await dispatch(getOrg(id));
    //can use binary search if its sorted by id
    for( let i = 0; i < org.members.length ;i++){
      if(session.id === org.members[i].id) return
    }
    hist("/NotFound")
  }
  useEffect(() => {
    loadData()
  }, []);

  useEffect(() => {
    function onResize() {
      let r = document.querySelector(".r");
      if(d.current?.classList[1] === "le") return;
      if(!r) return;
      if (r.clientWidth > document.body.clientWidth * 0.6) {
        size.current.classList.add("hide");
        size1.current.classList.add("hide");
        msgBar.current.classList.add("hide");
        d.current.classList.add("hide");
        r.classList.add("abs");
      } else if (r.clientWidth < document.body.clientWidth * 0.6) {
        size.current.classList.remove("hide");
        size1.current.classList.remove("hide");
        msgBar.current.classList.remove("hide");
        d.current.classList.remove("hide");
        r.classList.remove("abs");
      }
    }
    window.onresize = onResize;
  }, []);
  return (
    <>
      <div className="messageBar" ref={msgBar}>
        <div className="title">
          <h2 className="unselect">{org.name}</h2>
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
        </div>
        <div className="channelContent" ref={size}>
          <div className="od">
            <div className="uc" ref={size1}>
              <div className="channels">
                <div
                  onClick={(e) => {
                    caret.current.classList.toggle("side");
                    if (!showChannelList) setShowChannelList(true);
                    if (showChannelList) setShowChannelList(false);
                  }}
                >
                  <div className="cs">
                    <div className="is isc">
                      <i className="fas fa-caret-down" ref={caret}></i>
                    </div>

                    <p className="unselect">Channels</p>
                  </div>
                  <NewChannel />
                </div>
                {showChannelList && (
                  <ChannelList
                    setSelectedChannel={setSelectedChannel}
                    setSelectedChannelId={setSelectedChannelId}
                  />
                )}
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
                    <p className="unselect">Direct Messages</p>
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
              <div className="channels">
                <div
                  onClick={(e) => {
                    mCaret.current.classList.toggle("side");
                    if (!showMemberList) setshowMemberList(true);
                    if (showMemberList) setshowMemberList(false);
                  }}
                >
                  <div className="cs">
                    <div className="is isc">
                      <i className="fas fa-caret-down" ref={mCaret}></i>
                    </div>
                    <p className="unselect">Members</p>
                  </div>
                  <NewMember />
                </div>
                {showMemberList && (
                  <div className="channelContainer unselect">
                    {members?.map((member) => {
                      return (
                        <form
                          className="ms"
                          key={member.id}
                          onSubmit={handleSubmit}
                        >
                          <h3>{member.username}</h3>
                          {members.length > 1 ? (
                            <button className="btn">
                              <i
                                className="fas fa-trash-alt channelContainer"
                                onClick={() => {
                                  setDeleteMember(member.id);
                                }}
                              ></i>
                            </button>
                          ) : (
                            ""
                          )}
                        </form>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="height"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d"
        ref={d}
        onMouseDown={(x) => {
          let drag = true;
          x.target.classList.add("dSelect");
          document.addEventListener("mouseup", () => {
            drag = false;
            x.target.classList.remove("dSelect");
          });
          document.addEventListener("mousemove", (e) => {
            let r = document.querySelector(".r");
            if (
              e.clientX > 235 &&
              e.clientX < document.body.clientWidth * 0.5 &&
              drag
            ) {
              d.current.classList.remove("le");
              size.current.classList.remove("hide");
              size1.current.classList.remove("hide");
              msgBar.current.classList.remove("hide");
              r.classList.remove("abs");
              size.current.style.width = e.clientX + 2 + "px";
              size1.current.style.width = e.clientX + 2 + "px";
            } else if ((d.current?.classList[1] !== "le") && e.clientX < 220 && drag) {
              size.current.classList.add("hide");
              size1.current.classList.add("hide");
              msgBar.current.classList.add("hide");
              d.current.classList.add("le");
              r.classList.add("abs");
            }
          });
        }}
      ></div>
    </>
  );
}

export default MessageBar;
