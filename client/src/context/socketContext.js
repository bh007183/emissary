import * as React from "react"
import { io } from "socket.io-client";

const SocketContext = React.createContext({
    socket: io("http://localhost:8080", {
        path: "/socket",
        auth: {
          token: localStorage.getItem("token"),
        },
      }),
    
})

function socketReducer(state, action){
    switch (action.type) {
        case "socket":{
            return state.socket = action.payload
        }
       
        default:

            throw new Error(`unknown action type ${action.type}`)
    }
}

function SocketProvider({children}){
    const [state, dispatch] = React.useReducer(socketReducer, {test1: "", test2: []})
    const value = {state, dispatch}
return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

function useSocketContext(){
    const context = React.useContext(SocketContext)
    if(!context){
        throw new Error("useSocketContext must be used inside SocketProvider")
    }
    return context
}

export {SocketProvider, useSocketContext}