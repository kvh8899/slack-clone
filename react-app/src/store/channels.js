const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";
const EDIT_CHANNEL = "channels/EDIT_CHANNEL";
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";
//Channel actions
export const getChannels = (channels, orgId) => ({
  type: GET_CHANNELS,
  payload: channels,
  orgId,
});

export const addChannel = (channelInfo) => ({
  type: ADD_CHANNEL,
  payload: channelInfo,
});

export const editChannel = (channelInfo, channelId) => ({
  type: EDIT_CHANNEL,
  payload: channelInfo,
  channelId
})

export const deleteChannel = (channelId, orgId) => ({
  type: DELETE_CHANNEL,
  payload: channelId,
  orgId,
});

// Get Channels
export const readChannels = (orgId) => async (dispatch) => {
  const res = await fetch(`/api/organizations/${orgId}/channels`);
  if (res.ok) {
    const channels = await res.json();
    dispatch(getChannels(channels.channels, orgId));
    return channels;
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
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  return data;
};

//Edit Channel
export const editChannelThunk = (name, channelId) => async (dispatch) => {
  console.log(name,channelId)
  const res = await fetch(`/api/channels/${channelId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name}),
  })
  if (res.ok) {
    const channel = await res.json()
    dispatch(editChannel(channel, channelId))
  }
}


//Delete Channel
export const removeChannel = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}/delete`, {
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
    case ADD_CHANNEL:
      return [...state, action.payload];
    case EDIT_CHANNEL:
      return state.map((e) => {
        if( e.id === action.payload.id){
          return action.payload;
        }
        return e;
      })
    default:
      return state;
  }
}
