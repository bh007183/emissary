import {createSlice} from "@reduxjs/toolkit"
import {apiStart} from "./apiActions"

const slice = createSlice({
    name: "Message",
    initialState: {
        name: "",
        roomId: "",
        Messages: []
    },
    reducers: {
        // setRoomId: (Message, action)=>{
        //     Message.roomId = action.payload
        // },
        getMessagesAPI: (Message, action)=> {
     
            console.log(action.payload)
            Message.roomId = action.payload.id
             Message.Messages = action.payload.Messages
        },
        setMessagesNEW: (Message, action)=>{
            Message.Messages = [...Message.Messages, action.payload]
        },
        setMessagesAfterDelete: (Message, action)=>{
            Message.Messages = Message.Messages.filter(message => message.id !== action.payload.messageId)
        },
    }
})
export const {setMessagesNEW, getMessagesAPI, setMessagesAfterDelete} = slice.actions
export default slice.reducer

export const getMessages = (roomId) => apiStart({
    url: "http://localhost:8080/api/getMessages/" + roomId,
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    },
    onSuccess: getMessagesAPI.type,
    
})