import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRoute } from "../../store/userActions";
import "./style.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { io } from "socket.io-client";


let socket;




export default function UserDash() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(clearRoute());
    console.log("test");
    socket = io("http://localhost:8080", {
        auth: {
            token: localStorage.getItem("token")
        }
    })
    socket.connect()
    
    socket.on("hello", async (socket) => {
        console.log(socket)
      });

    socket.on("connect", (data)=> {
        console.log("client Connected")
    })
    
  }, []);



  const handleKeyDown = (e) =>{
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
  }

  return (
    <div id="dashBoard">
      <div id="roomColumn">

      </div>
      <div id="messageController">
        <div id="formContainer">
          <form id="messageForm">
             
            <textarea
              id="input"
              placeholder="type here..."
              rows="2"
              onKeyUp={handleKeyDown}
            >  
            </textarea>
            <div id="formBar">
                <IconButton>
                    <SendIcon />
                </IconButton>

            </div>
          </form>
          </div>
      </div>
    </div>
  );
}
