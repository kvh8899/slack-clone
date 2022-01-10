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
      <div>
        <div>
          <i class="fas fa-caret-down"></i>
          <p>Channels</p>
        </div>
      </div>
      <div>
        <div>
          <p>Direct Messages</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBar;
