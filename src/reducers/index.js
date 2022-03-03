import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import ChatReducer from "./ChatReducer";
import UserReducer from "./UserReducer";

const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage
}
  
const chatPersistConfig = {
    key: 'chat',
    storage: AsyncStorage
}
  
const rootReducer = combineReducers({
    // user: persistReducer(userPersistConfig, UserReducer),
    // chat: persistReducer(chatPersistConfig, ChatReducer)
    user: UserReducer,
    chat: ChatReducer
});

export default rootReducer;