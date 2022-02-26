import { UserActions } from "../actions/UserActions";
import { initialUserState } from "../state/AppState";

export function sUser(state) {
    return state.user;
}

export default function UserReducer(state = initialUserState, action){
    switch (action.type) {
        case UserActions.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default: return state;
    }
}