import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "Socket",
    initialState: {
        Rooms: [],

    },
    reducers: {
        setRooms: function(Socket, action){
            Socket.Rooms = action.payload
        }
    }

})
export const {setRooms} = slice.actions
export default slice.reducer