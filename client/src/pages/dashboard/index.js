import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRoute } from "../../store/userActions";
import "./style.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

export default function UserDash() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearRoute());
    console.log("test");
  }, []);

  const handleKeyDown = (e) =>{
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
  }

  return (
    <div id="dashBoard">
      <div id="roomColumn">hey</div>
      <div id="messageController">
        <div id="formContainer">
          <form id="messageBar">
             
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
     
        ho
      </div>
    </div>
  );
}
