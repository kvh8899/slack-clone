import { useState } from "react";
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
        <i className="fas fa-plus"></i>
      </button>
    </div>
  ); 
}

export default NewChannel;
