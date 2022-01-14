import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMemberOff } from "../store/showMemberForm";
import { addMembers } from "../store/orgmainchat";
import { useParams } from "react-router";
<<<<<<< HEAD
import "./newMemberForm.css";
=======
>>>>>>> 70f1b2203ec0b2f9f02d18c875fcde7cd6a89d1e

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

    // console.log ("😣",userName)
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

<<<<<<< HEAD
  // console.log("😣😣", users);

=======
>>>>>>> 70f1b2203ec0b2f9f02d18c875fcde7cd6a89d1e
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
          className="memberForm"
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
              onChange={(e) => {
                setMemberName(e.target.value);
              }}
            />
            {searchQuery.length > 0 && (
              <div className="search-content">
                <ul>
                  {searchQuery.length > 0 &&
                    filteredUsers?.map((user) => {
                      return (
                        <li>
                          <button
                            className="namebutton"
                            id={user.id}
                            key={user.id}
                            onClick={addToOrg}
                            username={user.username}
                          >
                            {user.username}
                          </button>
                        </li>
                      );
                    })}
                  <li>asdasd</li>
                  <li>asdasd</li>
                  <li>asdasd</li>
                  <li>asdasd</li>
                  <li>asdasd</li>
                  <li>asdasd</li>
                </ul>
              </div>
            )}
          </div>
          <div id="memberButton">
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
