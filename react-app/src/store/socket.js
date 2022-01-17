import io from "socket.io-client";
const GET_SOCKET = "get/SOCKET"

export const getSocket = () => {
    return {
        type:GET_SOCKET
    }
}
// must use http here
//"https://zing-app.herokuapp.com" for heroku
const endPoint = "https://app-zing.herokuapp.com";

const socket = (state = null,action) => {
    switch(action.type){
        case GET_SOCKET:
            return io(`${endPoint}`,{
                reconnectionDelayMax: 10000});
        default:
            return state
    }
}

export default socket;