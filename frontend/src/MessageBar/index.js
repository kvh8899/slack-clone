import "./messagebar.css";
import {useRef} from "react"
function MessageBar() {
  const caret = useRef(null);
  const dCaret = useRef(null);
  return (
    <div className="messageBar">
      <div className="title">
        <h2>Title</h2>
        <div>
          <button><i className="far fa-edit"></i></button>
        </div>
      </div>
      <div className="channels">
        <div onClick={(e) => {
              caret.current.classList.toggle("side");
            }}>
          <i
            className="fas fa-caret-down"
            ref={caret}
          ></i>
          <p>Channels</p>
        </div>
      </div>
      <div className="channels">
        <div onClick={(e) => {
              dCaret.current.classList.toggle("side");
            }}>
          <i
            className="fas fa-caret-down"
            ref={dCaret}
          ></i>
          <p>Direct Messages</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBar;
