const SET_WORKSPACES = "workspaces/SET_WORKSPACES"

const addWorkspaces = (workspaces) => { 
    return {
        type:SET_WORKSPACES,
        payload: workspaces
    }
}

export const workspaces = (userId) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}/organizations`);

    if(res.ok){
        const body = await res.json();
        dispatch(addWorkspaces(body.workspaces))
        return;
    }else{
        res.status = 404;
        return null;
    }
}

export default function orgReducer(state = [],action){

    switch(action.type){
        case SET_WORKSPACES:
            return action.payload
        default:
            return state
    }
}