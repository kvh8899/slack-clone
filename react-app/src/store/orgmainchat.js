const GET_ONE_ORG = 'orgs/GET_ONE_ORG'
const EDIT_ORG = 'orgs/EDIT_ORG'
const ADD_MEMBER = "orgs/ADD_MEMBER";
const DELETE_MEMBER = "workspaces/DELETE_MEMBER";

const getOneOrg = data => ({
    type: GET_ONE_ORG,
    data
})

export const addMember = (organization) => ({
    type: ADD_MEMBER,
    payload: organization,
});

export const deleteMember = (member) => {
  return {
    type: DELETE_MEMBER,
    payload: member,
  };
};

export const getOrg = (id) => async dispatch => {
    const res = await fetch(`/api/organizations/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOneOrg(data))
        return data
    }
}

//Add Member
export const addMembers = (orgId, userId) => async (dispatch) => {
    console.log(orgId, 'orgId')
    console.log(userId, 'userId')
    const response = await fetch(`/api/organizations/${orgId}/members/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId
        })
    });
    console.log(response, 'hiiiii')
    const data = await response.json();
    dispatch(addMember(data));
    return data;
};

//Delete Member
export const removeMember = (memberId, orgId) => async (dispatch) => {
    // console.log("😣Fet")
    const res = await fetch(`/api/organizations/${orgId}/${memberId}`, {
      method: "DELETE",
    });

  if (res.ok) {
    const member = await res.json();
    dispatch(deleteMember(member));
    return member;
  } else {
    return null;
  }
};


export default function orgmainchatReducer(state = {}, action) {
    switch (action.type) {
      case GET_ONE_ORG:
        return action.data;
      case EDIT_ORG:
        return action.org;
      case ADD_MEMBER:
        return {
          ...state,
          'members': [...state.members, action.payload],
        };
      case DELETE_MEMBER:
        // console.log("🍎🍎🍎",action.payload);
        const newState = state.members.filter(
          (member) => member.id !== action.payload.user_id
        );
        return { ...state, 'members': newState };
      default:
        return state;
    }
}
