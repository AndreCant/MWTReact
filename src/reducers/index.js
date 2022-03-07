import { combineReducers } from "redux";
import ChatReducer from "./ChatReducer";
import UserReducer from "./UserReducer";
  
const rootReducer = combineReducers({
    user: UserReducer,
    chat: ChatReducer
});

export default rootReducer;