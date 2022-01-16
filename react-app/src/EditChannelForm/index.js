import { editChannelOff } from "../store/showEditChannelForm";
import { editChannelThunk, removeChannel } from "../store/channels";
import { getAllMessages } from "../store/messages";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getSocket } from "../store/socket";
import "./editChannelForm.css";

function EditChannelForm() {
  const dispatch = useDispatch();
  const hist = useNavigate();
  const { id, channelId } = useParams();
  const showForm = useSelector((state) => state.editChannelFormReducer);
  const channels = useSelector((state) => state.channelReducer);
  const socket = useSelector((state) => state.socket);
  const org = useSelector((state) => state.orgmainchatReducer);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("updateChannel", (channel) => {
        const { channelName, channelId } = channel;
        dispatch(editChannelThunk(channelName, channelId));
      });
    }
  }, [socket]);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(removeChannel(channelId));
    //update messages when removing channel
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].id === parseInt(channelId) && i === 0) {
        hist(`/organizations/${id}/channels/${channels[i + 1].id}`);
        await dispatch(getAllMessages(channels[i + 1].id));
        return;
      } else if (channels[i].id === parseInt(channelId)) {
        hist(`/organizations/${id}/channels/${channels[i - 1].id}`);
        await dispatch(getAllMessages(channels[i - 1].id));
        return;
      }
    }
  };
  return (
    <>
      {showForm && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(editChannelOff());
          }}
        ></div>
      )}
      {showForm && (
        <form
          className="channelForm"
          onSubmit={async (e) => {
            e.preventDefault();
            if (channelName) {
              dispatch(editChannelOff());
              socket.emit("updateChannel", {
                channelName,
                channelId,
                organization: org.id,
              });
            }
            setChannelName("");
          }}
        >
          <div className="form1">
            <h2>Edit Text Channel</h2>
            <label>Channel Name</label>
            <input
              placeholder={"# New Channel Name"}
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
              // required
            ></input>
          </div>
          <div id="channelButton">
            {channels.length > 1 ? (
              <div className="delete" id={channelId} onClick={handleDelete}>
                Delete <i className="fas fa-trash-alt"></i>
              </div>
            ) : (
              ""
            )}
            <p
              className="cancel"
              onClick={(e) => {
                dispatch(editChannelOff());
                setChannelName("");
              }}
            >
              Cancel
            </p>
            <button className="submit" disabled={!channelName}>
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditChannelForm;
