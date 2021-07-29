import {combineReducers} from 'redux'
import roomReducer from "./roomActions"
import userReducer from "./userActions"
import messageReducer from "./messageActions"
import componentReducer from "./componentActions"

export default combineReducers({
    Room: roomReducer,
    User: userReducer,
    Message: messageReducer,
    Component: componentReducer

})