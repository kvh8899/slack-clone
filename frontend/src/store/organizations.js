const SET_WORKSPACES = "workspaces/SET_WORKSPACES"
const DELETE_WORKSPACES = "workspaces/DELETE_WORKSPACES"

const addWorkspaces = (workspaces) => {
    return {
        type: SET_WORKSPACES,
        payload: workspaces
    }
}


export const workspaces = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/organizations`);

    if (res.ok) {
        const body = await res.json();
        dispatch(addWorkspaces(body.workspaces))
        return;
    } else {
        return null;
    }
}

const deleteWorkspaces = (workspace) => {
    return {
        type: DELETE_WORKSPACES,
        payload: workspace
    }
}

export const removeWorkspace = (organizationId) => async (dispatch) => {
    const res = await fetch(`/api/organizations/${organizationId}/delete`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const organization = await res.json();
        dispatch(deleteWorkspaces(organization))
        return;
    } else {
        return null;
    }
}

export default function orgReducer(state = [], action) {

    switch (action.type) {
        case SET_WORKSPACES:
            return action.payload
        case DELETE_WORKSPACES:
            return state.filter(workspace => workspace.id !== action.payload.id)
        default:
            return state
    }
}
