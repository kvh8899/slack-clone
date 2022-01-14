const GET_ONE_ORG = 'orgs/GET_ONE_ORG'
const EDIT_ORG = 'orgs/EDIT_ORG'
const ADD_MEMBER = "orgs/ADD_MEMBER";

const getOneOrg = data => ({
    type: GET_ONE_ORG,
    data
})

export const addMember = (organization) => ({
    type: ADD_MEMBER,
    payload: organization,
});

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


export default function orgmainchatReducer(state = {}, action) {
    switch (action.type) {
        case GET_ONE_ORG:
            return action.data
        case EDIT_ORG:
            return action.org
        case ADD_MEMBER:
            return {
                ...state,
                'members': [...state.members, action.payload]
            };
        default:
            return state
    }
}
