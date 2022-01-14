import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMemberOff } from "../store/showMemberForm";
import { addMembers } from "../store/orgmainchat";
import SingleMember from "../SingleMember";
import { useParams } from "react-router";

function NewMemberForm() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.addMemberFormReducer);
  const [memberName, setMemberName] = useState("");
  const org = useSelector((state) => state.orgmainchatReducer);
  const users = org.available_users?.map((user) => user);
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filterUsers = (users, query) => {

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const userName = user.username.toLowerCase();
      return userName.includes(query.toLowerCase());
    });
  }

  const filteredUsers = filterUsers(users, searchQuery);

  const addToOrg = async (e) => {
    await dispatch(addMembers(id, e.target.id))
  }

  const addMember = async (e) => {
    await dispatch(addMembers(memberName));
  };

  return (
    <>
      {showForm && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(addMemberOff());
          }}
        ></div>
      )}
      {showForm && (
        <form
          className="channelForm"
          onSubmit={async (e) => {
            e.preventDefault();
            if (memberName) {
              dispatch(addMemberOff());
              await addMember();
            }
            setMemberName("");
          }}
        >
          <div className="form1">
            <h2>Add Member to Workspace</h2>
            <label>User Name</label>
            <input
              placeholder={"user name"}
              value={searchQuery}
              onInput={(e) => setSearchQuery(e.target.value)}
              name="s"
              onChange={(e) => { setMemberName(e.target.value) }}
            />
            {searchQuery.length > 0 && (
              <ul>
                {searchQuery.length > 0 &&

                  filteredUsers?.map((user) => {
                    return (
                      <li onClick={addToOrg} id={user.id} key={user.id}>
                        <SingleMember username={user.username} />
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          <div id="channelButton">
            <p
              className="cancel"
              onClick={(e) => {
                dispatch(addMemberOff());
                setMemberName("");
              }}
            >
              Cancel
            </p>
            <button className="submit" disabled={!memberName}>
              Add Member
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default NewMemberForm;
