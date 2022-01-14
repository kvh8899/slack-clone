import {onAction} from "../store/showForm";
import {useDispatch} from "react-redux";
import "./newchannel.css";
function NewChannel() {
    const dispatch = useDispatch();
  return (
    <div className="addChannel">
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(onAction());
        }}
      >
          <div className="is"><i className="fas fa-plus"></i></div>
      </button>
    </div>
  ); 
}

export default NewChannel;
