import {createSlice} from "@reduxjs/toolkit"

import {apiStart} from "./apiActions"

const slice = createSlice({
    name: "User",
    initialState: {
        FirstName: "",
        Success:"",
        Error: "",
        Route: null,
        Friends: [],
        ConnectionSearchResults: [],
        Notifications: []
    },
    reducers: {
        setName: (User, action) => {
           User.FirstName = action.payload
        },
        apiCallSuccess: (User, action) => {
            User.Success = action.payload
        },
        apiCallError: (User, action) => {
            User.Error = action.payload
        },
        clearError: (User) => {
            User.Error = ""
        },
        clearSuccess: (User) => {
            User.Success = ""
        },
        clearRoute: (User) => {
            User.Route = null
        },
        loginSuccess: (User, action) => {
            localStorage.setItem("token", action.payload.token)
            User.Route = true
            User.FirstName = action.payload.user
        },
        setFriends: (User, action) => {
            User.Friends = action.payload
        },
        addNewFriends: (User, action) => {
            User.Friends = [action.payload, ...User.Friends]
        },
        setConnectionSearchResults: (User, action)=>{
            User.ConnectionSearchResults = action.payload
        },
        

    },
    
})
export const {setName, apiCallSuccess, apiCallError, clearError, clearSuccess, loginSuccess, clearRoute, setFriends, setConnectionSearchResults, addNewFriends} = slice.actions
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

export const findConnection = (connection) => apiStart({
    url: "http://localhost:8080/api/findConnection/" + connection,
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    },
    onSuccess: setConnectionSearchResults.type,
    onError: apiCallError.type

})

// export const addFriend = (id) => apiStart({
//     url: "http://localhost:8080/api/addFriend",
//     headers: {
//         authorization: `Bearer ${localStorage.getItem("token")}`
//     },
//     method: "put",
//     data: {friendId: id},
//     onSuccess: apiCallSuccess.type,
//     onError: apiCallError.type

// })