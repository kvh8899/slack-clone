const SET_WORKSPACES = "workspaces/SET_WORKSPACES";
const ADD_WORKSPACE = "workspaces/ADD_WORKSPACE";
const EDIT_ORG = "workspaces/EDIT_ORG";
const DELETE_WORKSPACES = "workspaces/DELETE_WORKSPACES";

const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";
const EDIT_CHANNEL = "channels/EDIT_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";

const ADD_MEMBER = "members/ADD_MEMBER";

const GET_MESSAGES = "messages/GET_MESSAGES";
const ADD_MESSAGE = "messages/ADD_MESSAGE";
const EDIT_MESSAGE = "messages/EDIT_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

//Organization actions
export const getWorkspace = (workspaces) => {
  return {
    type: SET_WORKSPACES,
    payload: workspaces,
  };
};

export const addWorkspace = (workspaces) => ({
  type: ADD_WORKSPACE,
  payload: workspaces,
});

export const editOrg = (orgInfo) => ({
  type: EDIT_ORG,
  payload: orgInfo,
});

const deleteWorkspaces = (workspace) => {
  return {
    type: DELETE_WORKSPACES,
    payload: workspace,
  };
};

//Channel actions
export const getChannels = (channels, orgId) => ({
  type: GET_CHANNELS,
  payload: channels,
  orgId: orgId,
});

export const addChannel = (channelInfo) => ({
  type: ADD_CHANNEL,
  payload: channelInfo,
});

export const editChannel = (channelInfo, orgId, channelId) => ({
  type: EDIT_CHANNEL,
  payload: channelInfo,
  orgId,
  channelId,
});

export const deleteChannel = (channelId, orgId) => ({
  type: DELETE_CHANNEL,
  payload: channelId,
  orgId,
});

//Member action
export const addMember = (organization) => ({
  type: ADD_MEMBER,
  payload: organization,
});

//Messages action
export const getMessages = (messages, orgId, channelId) => ({
  type: GET_MESSAGES,
  payload: messages,
  orgId,
  channelId,
});

export const addMessage = (messages, orgId) => ({
  type: ADD_MESSAGE,
  payload: messages,
  orgId,
});

export const editMessage = (messages, orgId) => ({
  type: EDIT_MESSAGE,
  payload: messages,
  orgId,
});

export const deleteMessage = (messages) => ({
  type: DELETE_MESSAGE,
  payload: messages,
});

//Organization Thunks

//Get Org
export const getWorkspaces = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/organizations`);

  if (res.ok) {
    const body = await res.json();
    dispatch(getWorkspace(body.workspaces));
    return body;
  } else {
    return null;
  }
};

//Add Org
export const addWorkspaces = (name) => async (dispatch) => {
  console.log(name);
  const response = await fetch(`/api/organizations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  const data = await response.json();
  dispatch(addWorkspace(data));
  return data;
};

//Edit Org
export const editOrgThunk = (organization) => async (dispatch) => {
  const id = organization.get("id");
  const response = await fetch(`/api/organizations/${id}`, {
    method: "PUT",
    body: organization,
  });
  const data = await response.json();
  dispatch(editOrg(data));
  return data;
};

//Delete Org
export const removeWorkspace = (organizationId) => async (dispatch) => {
  const res = await fetch(`/api/organizations/${organizationId}/delete`, {
    method: "DELETE",
  });

  if (res.ok) {
    const organization = await res.json();
    dispatch(deleteWorkspaces(organization));
    return;
  } else {
    return null;
  }
};

export default function orgReducer(state = [], action) {
  switch (action.type) {
    case SET_WORKSPACES:
      return action.payload;
    case DELETE_WORKSPACES:
      return state.filter((workspace) => workspace.id !== action.payload.id);
    default:
      return state;
    case ADD_WORKSPACE:
      return [...state, action.payload];
  }
}
