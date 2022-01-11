import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWorkspaces } from "../store/organizations";
import { useNavigate } from "react-router-dom";
import MessageBar from "../MessageBar";


import "./workspaceCreate.css";

export default function NewWorkspace() {
  const dispatch = useDispatch();
  const hist = useNavigate();

  const [orgName, setOrgName] = useState("");

  const validate = () => {
    const validationErrors = [];
    if (!orgName) validationErrors.push("Workspace name required.");
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", orgName);
    await dispatch(addWorkspaces({ name: orgName }));
    hist("/organization");
  };
  return (
    <div className="content">
      <div className="topBar"></div>
      <div className="midContent1">
        <MessageBar />
        <div className="mid-content">
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="header">
                What’s the name of your company or team?
              </h2>
              <p>
                This will be the name of your Zing workspace — choose something
                that your team will recognize.
              </p>
            </div>
            <div>
              <input
                className="input-name"
                type="text"
                name="name"
                placeholder="Ex: Acme Marketing or Acme Co"
                onChange={(e) => setOrgName(e.target.value)}
              ></input>
              <button className="submit-button">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
