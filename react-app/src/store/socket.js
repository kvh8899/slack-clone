import io from "socket.io-client";
const GET_SOCKET = "get/SOCKET"

export const getSocket = () => {
    return {
        type:GET_SOCKET
    }
}
// must use http here
//"https://<herokuname>.herokuapp.com" for heroku
const endPoint = "http://localhost:5000";

const socket = (state = io(`${endPoint}`,{
    reconnectionDelayMax: 10000}),action) => {
    switch(action.type){
        case GET_SOCKET:
            return state;
        default:
            return state
    }
}

export default socket;