import { offAction } from "../store/showForm";
import { postChannel } from "../store/channels";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router";
import "./newchannelform.css";
function NewChannelForm() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const showForm = useSelector((state) => state.showFormReducer);
  const [channelName, setChannelName] = useState("");
  const createChannel = async (e) => {
    await dispatch(postChannel(id, channelName));
  };
  return (
    <>
      {showForm && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(offAction());
          }}
        ></div>
      )}
      {showForm && (
        <form
          className="channelForm"
          onSubmit={async(e) => {
              e.preventDefault();
            if (channelName){
                dispatch(offAction());
                await createChannel()
            }
            setChannelName("");
          }}
        >
          <div className="form1">
            <h2>Create Text Channel</h2>
            <label>Channel Name</label>
            <input
              placeholder={"# New Channel"}
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
              required
            ></input>
          </div>
          <div id="channelButton">
            <p
              className="cancel"
              onClick={(e) => {
                dispatch(offAction());
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

export default NewChannelForm;
