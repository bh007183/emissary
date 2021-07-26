import {createSlice} from "@reduxjs/toolkit"
import {apiStart} from "./apiActions"

const slice = createSlice({
    name: "User",
    initialState: {
        FirstName: "",
        Success:"",
        Error: "",
        Route: null
    },
    reducers: {
        setName: (User, action) => {
           User.FirstName = action.payload
        },
        apiCallSuccess: (User, action) => {
            User.Success = action.payload
        },
        apiCallError: (User, action) => {
            console.log(action.payload)
            User.Error = action.payload
        },
        clearError: (User, action) => {
            User.Error = ""
        },
        clearSuccess: (User, action) => {
            User.Success = ""
        },
        clearRoute: (User, action) => {
            User.Route = null
        },
        loginSuccess: (User, action) => {
            localStorage.setItem("token", action.payload.token)
            User.Route = true
            User.FirstName = action.payload.user
        }
    },
    
})
export const {setName, apiCallSuccess, apiCallError, clearError, clearSuccess, loginSuccess, clearRoute} = slice.actions
export default slice.reducer

export const createUser = (user) => apiStart({
    url: "http://localhost:8080/api/createUser",
    method: "POST",
    data: user,
    onSuccess: apiCallSuccess.type,
    onError: apiCallError.type

})
export const loginApi = (login) => apiStart({
    url: "http://localhost:8080/api/login",
    method: "POST",
    data: login,
    onSuccess: loginSuccess.type,
    onError: apiCallError.type

})