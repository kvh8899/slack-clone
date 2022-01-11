import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWorkspaces } from "../store/organizations";
import MessageBar from "../MessageBar";

import { useNavigate } from "react-router-dom";
import "./workspaceCreate.css";

export default function NewWorkspace() {
  const dispatch = useDispatch();
  const [orgName, setOrgName] = useState("");

  const validate = () => {
    const validationErrors = [];
    if (!orgName) validationErrors.push("Workspace name required.");
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors && errors.length > 0) {
      return setErrors(errors);
    }

    const formData = new FormData();
    formData.append("name", orgName);

    let createdOrg = await dispatch(addWorkspaces(formData));
    const defaultChannel = {
      org_id: createdOrg.id,
      name: "Welcome",
    };
    dispatch(addWorkspaces(defaultChannel));
  }


  return (
    <div className="content">
      <div className="topBar"></div>
      <div className="midContent1">
        <MessageBar />
        <div className="mid-content">
          <form onSubmit={handleSubmit}>
          <div>
            <h2 className="header">What’s the name of your company or team?</h2>
            <p>
              This will be the name of your Zing workspace — choose something
              that your team will recognize.
            </p>
          </div>
          <div>
            <input className="input-name"
              type="text"
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
