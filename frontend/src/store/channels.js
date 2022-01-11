const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";
const EDIT_CHANNEL = "channels/EDIT_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";
const ADD_MEMBER = "members/ADD_MEMBER";
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

// Get Channels
export const readChannels = (orgId) => async (dispatch) => {
  const channels = await fetch(`/api/organizations/${orgId}/channels`);

  if (res.ok) {
    const body = await res.json();
    dispatch(getChannels(channels, orgId));
    return body;
  } else {
    return null;
  }
};

//Add Channel
export const postChannel = (orgId, name) => async (dispatch) => {
  const response = await fetch(`/api/organizations/${orgId}/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name),
  });
  const data = await response.json();
  dispatch(addChannel(data));
  return data;
};

//Edit Channel
export const editChannelThunk = (channel) => async (dispatch) => {
  const id = channel.get("id");
  const response = await fetch(`/api/channels/${id}/edit`, {
    method: "PUT",
    body: channel,
  });
  const data = await response.json();
  dispatch(editChannel(data));
  return data;
};


//Delete Channel
export const removeChannel = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channel/${channelId}/delete`, {
    method: "DELETE",
  });

  if (res.ok) {
    const channel = await res.json();
    dispatch(deleteChannel(channel));
    return;
  } else {
    return null;
  }
};

export default function channelReducer(state = [], action) {
  switch (action.type) {
    case GET_CHANNELS:
      return action.payload;
    case DELETE_CHANNEL:
      return state.filter((channel) => channel.id !== action.payload.id);
    default:
      return state;
    case ADD_CHANNEL:
      return [...state, action.payload];
  }
}
