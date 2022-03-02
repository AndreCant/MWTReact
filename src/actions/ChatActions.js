import { getMessages } from "../service/ChatService";

export const ChatActions = {
    GET_MESSAGES: "GET_MESSAGES"
}

export function getMessages(user_1, user_2){
    return {
        type: ChatActions.GET_MESSAGES,
        payload: await getMessages(user_1, user_2)
    }
}