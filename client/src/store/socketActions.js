import {createSlice} from "@reduxjs/toolkit"
import {apiStart} from "./apiActions"

const slice = createSlice({
    name: "Socket",
    initialState: {
        Rooms: [],
        Notifications: [],
       

    },
    reducers: {
       
        setRooms: function(Socket, action){
            Socket.Rooms = action.payload
        },
        unshiftRooms: function(Socket, action){
            Socket.Rooms = [action.payload, ...Socket.Rooms]
        },
        setNotifications: function(Socket, action){
            Socket.Notifications = [action.payload, ...Socket.Notifications]
        },
        removeNotification: function(Socket, action){
            Socket.Notifications = Socket.Notifications.filter(item => item.friendId !== action.payload.id)
        },
        setRoomsAfterDelete: function(Socket, action){
            Socket.Rooms = Socket.Rooms.filter(room => room.id !== action.payload)

        }
    }

})
export const {setRooms, setNotifications, removeNotification, unshiftRooms, setRoomsAfterDelete, socketConnect} = slice.actions
export default slice.reducer


   


export const rejectFriendRequest = (rejectedId) => apiStart({
    url: "http://localhost:8080/api/rejectConnection",
    headers:{
        authorization: `Bearer ${localStorage.getItem("token")}`
    },
    method: "Put",
    data: rejectedId,
    onSuccess: removeNotification.type
})
