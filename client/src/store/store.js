import {combineReducers} from 'redux'
import roomReducer from "./roomActions"
import userReducer from "./userActions"
import messageReducer from "./messageActions"
import socketReducer from "./socketActions"

export default combineReducers({
    Room: roomReducer,
    User: userReducer,
    Message: messageReducer,
    Socket: socketReducer

})