import {combineReducers} from 'redux'
import userReducer from "./userActions"
import messageReducer from "./messageActions"
import socketReducer from "./socketActions"

export default combineReducers({
    User: userReducer,
    Message: messageReducer,
    Socket: socketReducer

})