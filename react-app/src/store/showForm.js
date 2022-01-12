
const OFF = "set/OFF"
const ON = "set/ON"

export const offAction = () => {
    return{
        type:OFF
    }
}

export const onAction = () => {
    return {
        type:ON
    }
}


const showFormReducer = (state = false,action) => {
    switch(action.type){
        case OFF:
            return false;
        case ON:
            return true;
        default:
            return false;
    }
}

export default showFormReducer;
