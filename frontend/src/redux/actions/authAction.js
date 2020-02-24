import { SET_AUTH } from "../constants";


export default function setAuthStates(auth, CU) {
    return ({ type: SET_AUTH, authenticated: auth, currentUser: CU })
}