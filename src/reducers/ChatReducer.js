import { ChatActions } from "../actions/ChatActions";
import { initialChatState } from "../state/AppState";

export function sChat(state) {
    return state.chat;
}

export default function ChatReducer(state = initialChatState, action){
    switch (action.type) {
        case ChatActions.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }

        case ChatActions.SET_CHAT_USERS:
            return {
                ...state,
                chatUsers: action.payload
            }
            
        default: return state;
    }
}