import "./settings.css";
import { useSelector } from "react-redux";
import {useState} from 'react';
import {useParams,useNavigate} from 'react-router'
function Settings({ settings, setSettings }) {
  const session = useSelector((state) => state.session.user);
  const [profile_picture,setProfile_picture] = useState("")
  const {id,channelId} = useParams();
  const hist = useNavigate();
  return (
    <div className="set">
      <div className="setTop">
        <button
          onClick={(e) => {
            setSettings(!settings);
          }}
        >
          X
        </button>
      </div>
      <h2>Settings</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch(`/api/users/${session.id}/edit`,{
              method:"PUT",
              headers:{"Content-Type":"application/json"},
              body: JSON.stringify({profile_picture}),
          });
          setSettings(!settings)
          hist(`/organizations/${id}/channels/${channelId}`)
        }}
      >
        <div className="settingsForm">
          <label>Profile Picture Link</label>
          <input id="prof" value={profile_picture} onChange={(e) => {
              setProfile_picture(e.target.value);
          }}></input>
        </div>
      </form>
    </div>
  );
}

export default Settings;
