import {createSlice} from "@reduxjs/toolkit"

import {apiStart} from "./apiActions"

const slice = createSlice({
    name: "User",
    initialState: {
        UserId: "",
        FirstName: "",
        Success:"",
        Error: "",
        Friends: [],
        ConnectionSearchResults: [],
        Notifications: []
    },
    reducers: {
        setUserId: (User, action) => {
            User.UserId = action.payload

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
        
        loginSuccess: (User, action) => {
            localStorage.setItem("token", action.payload.token)
            window.location.href = "/userDashBoard"

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
        removedFriend: (User, action) => {
            console.log(User.Friends.filter(friend => friend.id !== action.payload))
            User.Friends = User.Friends.filter(friend => friend.id !== parseInt(action.payload))
            console.log(User.Friends.filter(friend => friend.id !== action.payload))
        }
        

    },
    
})
export const {setName, apiCallSuccess, apiCallError, clearError, clearSuccess, loginSuccess, clearRoute, setFriends, setConnectionSearchResults, addNewFriends, setUserId,removedFriend} = slice.actions
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

