import React from 'react'
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import "./style.css"
export default function ReadWrite() {

    const handleKeyDown = (e) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
      };
    return (
        <div id="messageController">
          <div id="formContainer">
            <form id="messageForm">
              <textarea
                id="input"
                placeholder="type here..."
                rows="2"
                onKeyUp={handleKeyDown}
              ></textarea>
              <div id="formBar">
                <IconButton>
                  <SendIcon />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
    )
}
