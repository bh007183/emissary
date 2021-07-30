import {combineReducers} from 'redux'
import roomReducer from "./roomActions"
import userReducer from "./userActions"
import messageReducer from "./messageActions"
import componentReducer from "./componentActions"
import socketReducer from "./socketActions"

export default combineReducers({
    Room: roomReducer,
    User: userReducer,
    Message: messageReducer,
    Component: componentReducer,
    Socket: socketReducer

})