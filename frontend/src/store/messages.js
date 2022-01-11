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
