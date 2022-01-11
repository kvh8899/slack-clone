import { useState } from "react";
import "./newchannel.css";
function NewChannel() {
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        +
      </button>
    </div>
  );
}

export default NewChannel;
