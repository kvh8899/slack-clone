const SETCURRENT = "current/SETCURRENT"

export const setName = (channelName) =>{
    return {
        type:SETCURRENT,
        payload:channelName
    }
}
const currentChannel = (state = "",action) => {
    switch(action.type){
        case SETCURRENT:
            return action.payload;
        default:
            return state;
    }
}

export default currentChannel;