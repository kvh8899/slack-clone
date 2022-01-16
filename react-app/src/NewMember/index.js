import {addMemberOn} from "../store/showMemberForm";
import {useDispatch} from "react-redux";
import "./newchannel.css";
function NewMember() {
    const dispatch = useDispatch();
  return (
    <div className="addChannel">
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addMemberOn());
        }}
      >
          <div className="is"><i className="fas fa-plus"></i></div>

      </button>
    </div>
  );
}

export default NewMember;
