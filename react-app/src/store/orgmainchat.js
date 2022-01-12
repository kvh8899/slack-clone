const GET_ONE_ORG = 'orgs/GET_ONE_ORG'
const EDIT_ORG = 'orgs/EDIT_ORG'

const getOneOrg = data => ({
    type: GET_ONE_ORG,
    data
})

export const getOrg = (id) => async dispatch => {
    const res = await fetch(`/api/organizations/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOneOrg(data))
        return data
    }
}

export default function orgmainchatReducer(state = {}, action) {
    switch(action.type) {
        case GET_ONE_ORG:
            return action.data
        case EDIT_ORG:
            return action.org
        default:
            return state
    }
}
