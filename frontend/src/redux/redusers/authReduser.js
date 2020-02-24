import { SET_AUTH } from "../constants";

const INITIAL_STATE = {
    authenticated: false,
    currentUser: null
}


export default function authStates(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                authenticated: action.authenticated,
                currentUser: action.currentUser
            }

        default:
            return state;
    }
}