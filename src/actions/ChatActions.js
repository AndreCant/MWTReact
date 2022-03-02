import { Alert } from "react-native";
import { getMessages } from "../service/ChatService";

export const ChatActions = {
    GET_MESSAGES: "GET_MESSAGES",
    SET_MESSAGES: "SET_MESSAGES",
}

export function getChats(user_1, user_2){
    return (dispatch, getState) => {
        getMessages(user_1, user_2).then(messages => {
            dispatch(setChats(messages));
        }).catch(error => {
            Alert.alert('Error', error.message);
            console.error(error);
        });
    }
}

export function setChats(messages){
    return {
        type: ChatActions.SET_MESSAGES,
        payload: messages
    }
}