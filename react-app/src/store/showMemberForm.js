const OFF = "addMember/OFF";
const ON = "addMember/ON";

export const addMemberOff = () => {
  return {
    type: OFF,
  };
};

export const addMemberOn = () => {
  return {
    type: ON,
  };
};

const addMemberFormReducer = (state = false, action) => {
  switch (action.type) {
    case OFF:
      return false;
    case ON:
      return true;
    default:
      return false;
  }
};

export default addMemberFormReducer;
