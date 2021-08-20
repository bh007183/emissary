import { createSlice } from "@reduxjs/toolkit";
import { apiStart } from "./apiActions";

const slice = createSlice({
  name: "Message",
  initialState: {
    name: "",
    roomId: "",
    Messages: [],
  },
  reducers: {
    getMessagesAPI: (Message, action) => {
      Message.roomId = action.payload.id;
      Message.Messages = action.payload.Messages;
    },
    setMessagesNEW: (Message, action) => {
      console.log(action.payload)
      Message.Messages = [...Message.Messages, action.payload];
    },
    setMessagesAfterDelete: (Message, action) => {
      Message.Messages = Message.Messages.filter(
        (message) => message.id !== action.payload.messageId
      );
    },
    setMessagesAfterEdit: (Message, action) => {
      Message.Messages = Message.Messages.map((item) => {
        if (item.id === action.payload.messageId) {
          item.message = action.payload.message;
          item.giff = action.payload.giff
          return item;
        } else {
          return item;
        }
      });
    },
  },
});
export const {
  setMessagesNEW,
  getMessagesAPI,
  setMessagesAfterDelete,
  setMessagesAfterEdit,
} = slice.actions;
export default slice.reducer;

export const getMessages = (roomId) =>
  apiStart({
    url: "https://foreign-emissary.herokuapp.com/api/getMessages/" + roomId,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    onSuccess: getMessagesAPI.type,
  });
