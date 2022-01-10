import "./messagebar.css";

function MessageBar() {
  return (
    <div className="messageBar">
      <div className="title">
        <h2>Title</h2>
        <div>
          <button>New</button>
        </div>
      </div>
      <div className="channels">
        <div>
          <i
            className="fas fa-caret-down"
            onClick={(e) => {
              e.target.classList.toggle("side");
            }}
          ></i>
          <p>Channels</p>
        </div>
      </div>
      <div className="channels">
        <div>
          <i
            className="fas fa-caret-down"
            onClick={(e) => {
              e.target.classList.toggle("side");
            }}
          ></i>
          <p>Direct Messages</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBar;
