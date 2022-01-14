const OFF = 'editChannel/OFF'
const ON = 'editChannel/ON'

export const editChannelOff = () => {
    return {
        type: OFF
    }
}

export const editChannelOn = () => {
    return {
        type: ON
    }
}

const editChannelFormReducer = (state = false, action) => {
    switch(action.type) {
        case OFF:
            return false
        case ON:
            return true
        default:
            return false
    }
}

export default editChannelFormReducer
