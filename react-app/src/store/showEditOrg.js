const OFF = 'editOrg/OFF'
const ON = 'editOrg/ON'

export const editOrgOff = () => {
    return {
        type: OFF
    }
}

export const editOrgOn = () => {
    return {
        type: ON
    }
}

const editOrgFormReducer = (state = false, action) => {
    switch(action.type) {
        case OFF:
            return false
        case ON:
            return true
        default:
            return false
    }
}

export default editOrgFormReducer
