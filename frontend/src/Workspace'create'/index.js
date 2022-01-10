import React from "react";
import { Route } from 'react-router-dom';
import OrgListBar from "../OrgListBar"
import MessageBar from "../MessageBar";
import ChannelNameBar from "../ChannelNameBar";


const NewWorkspace = (props) => {

  return (
    <>
      <div className="Org-route-box">
        <Route>
          <OrgListBar />
          <MessageBar />
          <ChannelNameBar />
        </Route>
      </div>
    </>
  );
};

export default NewWorkspace;
