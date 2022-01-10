const GET_ALL_ORGS = 'organizations/GET_ALL_ORGS';
const ADD_ORG = 'organizations/ADD_ORG';
const EDIT_ORG = 'organizations/EDIT_ORG';
const DELETE_ORG = 'organizations/DELETE_ORG';

const GET_CHANNELS = 'channels/GET_CHANNELS';
const ADD_CHANNEL = 'channels/ADD_CHANNEL';
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL';
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL';

const ADD_MEMBER = 'members/ADD_MEMBER';

const GET_MESSAGES = 'messages/GET_MESSAGES';
const ADD_MESSAGE = 'messages/ADD_MESSAGE';
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE';
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE';

//Organization actions
export const getOrgs = (organization) => ({
    type: GET_ALL_ORGS,
    payload: organization
})

export const addOrg = (orgInfo) => ({
  type: ADD_ORG,
  payload: orgInfo
})

export const editOrg = (orgInfo) => ({
  type: EDIT_ORG,
  payload: orgInfo
})

export const deleteOrg = (orgId) => ({
  type: DELETE_ORG,
  payload: orgId
})

//Channel actions
export const getChannels = (channels, orgId) => ({
  type: GET_CHANNELS,
  payload: channels,
  orgId: orgId
})

export const addChannel = (channelInfo) => ({
  type: ADD_CHANNEL,
  payload: channelInfo
})

export const editChannel = (channelInfo, orgId, channelId) => ({
  type: EDIT_CHANNEL,
  payload: channelInfo,
  orgId,
  channelId
})

export const deleteChannel = (channelId, orgId) => ({
  type: DELETE_CHANNEL,
  payload: channelId,
  orgId
})

//Member action
export const addMember = (organization) => ({
  type: ADD_MEMBER,
  payload: organization
})

//Messages action
export const getMessages = (messages, orgId, channelId) => ({
  type: GET_MESSAGES,
  payload: messages,
  orgId,
  channelId
})

export const addMessage = (messages, orgId) => ({
  type: ADD_MESSAGE,
  payload: messages,
  orgId
})

export const editMessage = (messages, orgId) => ({
  type: EDIT_MESSAGE,
  payload: messages,
  orgId
})

export const deleteMessage = (messages) => ({
  type: DELETE_MESSAGE,
  payload: messages,
})


//Organization Thunks
export const getOrgsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/organizations/`);
  const data = await response.json();
  dispatch(getOrgs(data.organization));
  return data.organization;
};

//Add Org
export const addOrgThunk = (organization) => async (dispatch) => {
  const response = await fetch(`/api/organizations/`, {
    method: "POST",
    body: organization,
  });
  const data = await response.json();
  console.log("after fetch", data);
  dispatch(addOrg(data));
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
export const deleteOrgThunk = (orgId) => async (dispatch) => {
  const response = await fetch(`/api/organizations/${orgId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  dispatch(deleteOrg(data.id));
  return data;
};
