import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "Room",
    initialState: {
        listRooms: []
    },
    reducers: {
        setlist: (Room, action)=>{
            Room.listRooms = action.payload
        }
    }
})
export const {setlist} = slice.actions
export default slice.reducer