import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "Message",
    initialState: {
        roomId: "",
        listMessage: []
    },
    reducers: {
        setRoomId: (Message, action)=>{
            Message.roomId = action.payload
        },
        initialState: (Message, action)=> {
            Message.listMessage = action.payload
        }
    }
})
export const {setRoomId, initialState} = slice.actions
export default slice.reducer