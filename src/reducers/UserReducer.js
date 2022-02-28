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

        case UserActions.SET_IMAGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    photoURL: action.payload
                }
            }

        case UserActions.SET_DATA:
            return {
                ...state,
                user: {
                    ...state.user,
                    displayName: action.payload.username,
                    email: action.payload.email,
                    phoneNumber: action.payload.phone
                }
            }
            
        default: return state;
    }
}