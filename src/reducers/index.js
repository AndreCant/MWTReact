import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import UserReducer from "./UserReducer";

const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['items']
}
  
const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, UserReducer)
});

export default rootReducer;