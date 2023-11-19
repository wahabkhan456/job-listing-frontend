
const INITIAL_STATE = {
    jobList: []
}

const listReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SHOW_LIST": {
            return {
                ...state, 
                jobList: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default listReducer;