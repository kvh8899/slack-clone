import io from "socket.io-client";
const GET_SOCKET = "get/SOCKET"

export const getSocket = () => {
    return {
        type:GET_SOCKET
    }
}
// Production endpoint: "https://zing-app.herokuapp.com"
// Local testing endpoint: "http://localhost:5000/"
const endPoint = "http://localhost:5000/";

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