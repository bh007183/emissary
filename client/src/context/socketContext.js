import * as React from "react"
import { io } from "socket.io-client";

const socket = io("https://foreign-emissary.herokuapp.com", {
    path: "/socket",
    auth: {
      token: localStorage.getItem("token"),
    },
  })

const SocketContext = React.createContext({
    socket: socket.connect()
    
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
    const [state] = React.useReducer(socketReducer, {socket: socket.connect()})
return <SocketContext.Provider value={state}>{children}</SocketContext.Provider>
}

function useSocketContext(){
    const context = React.useContext(SocketContext)
    if(!context){
        throw new Error("useSocketContext must be used inside SocketProvider")
    }
    return context
}

export {SocketProvider, useSocketContext}