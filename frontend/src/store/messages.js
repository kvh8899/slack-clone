const GET_MESSAGES = "messages/GET_MESSAGES";
const ADD_MESSAGE = "messages/ADD_MESSAGE";
const EDIT_MESSAGE = "messages/EDIT_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

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
