import {createSlice} from "@reduxjs/toolkit"

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
        setNotifications: function(Socket, action){
            Socket.Notifications = [action.payload, ...Socket.Notifications]
        }
    }

})
export const {setRooms, setNotifications} = slice.actions
export default slice.reducer