import { ChatActions } from "../actions/ChatActions";
import { initialChatState } from "../state/AppState";

export function sChat(state) {
    console.log(state)
    return state.chat;
}

export default function ChatReducer(state = initialChatState, action){
    switch (action.type) {
        case ChatActions.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
            
        default: return state;
    }
}