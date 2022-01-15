const GET_MESSAGES = "messages/GET_MESSAGES";
const ADD_MESSAGE = "messages/ADD_MESSAGE";
const EDIT_MESSAGE = "messages/EDIT_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

//Messages action
export const getMessages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
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

export const getAllMessages = (channelId) => async(dispatch) => {
  const res = await fetch(`/api/channels/${channelId}/messages`);

  if(res.ok){
    const messages = await res.json();
    dispatch(getMessages(messages.messages));
    return messages;
  }
  return null;
}

export const createOneMessage = (channelId,content) => async(dispatch) => {
  const res = await fetch(`/api/channels/${channelId}/messages`,{
    method:'POST',
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({content})
  })
  if(res.ok){
    const message = await res.json();
    return message
  }
  return null
}
const messages = (state = [],action) => {
  switch(action.type){
    case GET_MESSAGES:
      return action.payload
    case ADD_MESSAGE:
      return [...state,action.payload]
    default:
      return state
  }
}

export default messages;