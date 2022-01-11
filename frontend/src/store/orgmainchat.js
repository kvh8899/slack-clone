const GET_ONE_ORG = 'orgs/GET_ONE_ORG'
const EDIT_ORG = 'orgs/EDIT_ORG'

const getOneOrg = data => ({
    type: GET_ONE_ORG,
    data
})

const updateOrg = org => ({
    type: EDIT_ORG,
    org
})

export const getOrg = (id) => async dispatch => {
    const res = await fetch(`/api/organizations/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOneOrg(data))
        return data
    }
}

export const editOrg = data => async dispatch => {
    const res = await fetch(`/api/organizations/edit/${data.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (res.ok) {
        const org = await res.json()
        dispatch(updateOrg(org))
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
