import React, {useEffect, useState, useRef} from 'react'
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import {getMessages} from "../../store/messageActions"
import {useDispatch, useSelector} from "react-redux"
import Messages from "../Messages"
import "./style.css"
export default function ReadWrite(props) {
  const scrollRef = useRef(null)
  const dispatch = useDispatch()
  const messages = useSelector(state => state.Store.Message.Messages)

    const handleKeyDown = (e) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
      };
      const [message, setMessage] = useState({
        roomId: "",
        message: ""
      })
      useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
   
      }, [messages])
      

     useEffect(() => {
      
       setMessage({...message, roomId: window.location.pathname.split("/")[3]})
       dispatch(getMessages(window.location.pathname.split("/")[3]))
       props.socket.emit("joinRoom", window.location.pathname.split("/")[3])
       
       
     }, [window.location.pathname])
    
     console.log(messages)
     const handleSubmit = (event) => {
       event.preventDefault()
 
       props.socket.emit("sendMessage", message)
       
     }

    return (
        <div id="messageController">
          <div id="messageCardContainer">
          {messages.map(item => 
          
          <Messages key={item.id} socket={props.socket} item={item}/>
            
            )}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br ref={scrollRef}></br>
          
            
            </div>
            
          
          <div id="formContainer">
            <form onSubmit={handleSubmit} id="messageForm">
              <textarea
                id="input"
                placeholder="type here..."
                onChange={(event) => setMessage({...message, message: event.target.value})}
                rows="2"
                onKeyUp={handleKeyDown}
              ></textarea>
              <div id="formBar">
                <IconButton type="submit">
                  <SendIcon />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
    )
}
