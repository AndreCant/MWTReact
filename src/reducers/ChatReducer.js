import { ChatActions } from "../actions/ChatActions";
import { initialChatState } from "../state/AppState";

export default function ChatReducer(state = initialChatState, action){
    switch (action.type) {
        case ChatActions.GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
            
        default: return state;
    }
}