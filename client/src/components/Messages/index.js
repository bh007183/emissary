import React, { useState, useRef} from "react";
import "./style.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {useSelector} from "react-redux"

export default function Messages(props) {
  const UserId = useSelector(state => state.Store.User.UserId)
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const textareaRef = useRef(null)

  const handleDeleteMessage = (event) => {
    let obj = {
      messageId: event.currentTarget.value,
      roomId: event.currentTarget.dataset.roomid,
    };
    props.socket.emit("DELETE_MESSAGE", obj);
    handleClose();
  };

  const handleEditopen = (event) => {
    setEdit({
        messageId: event.currentTarget.value,
        roomId: event.currentTarget.dataset.roomid,
        message: textareaRef.current.textContent
    });
    handleClose();
  };
  const handleEditMessage = () => {
    props.socket.emit("EDIT_MESSAGE", edit)
    setEdit(null)
  }
  const handleEditChange = (event) => {
    setEdit({
      ...edit, message: event.target.value
    })
  }

  const manageProfileDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div className="messageCard">
      <div className="imageContain">purple</div>

      <div className="textBlock">
        <p style={{ color: "wheat" }}>{props.item.author}</p>
        {edit !== null ? (
          <div className="editTextAreaContain">
          <textarea onChange={handleEditChange} value={edit.message} className="editMessageTextarea">
          
          </textarea>
          <button className="normalButton" style={{color: "rgb(125, 209, 0)"}} onClick={handleEditMessage}>Save Changes</button>
          <button className="normalButton" style={{color: "red"}} onClick={()=> setEdit(null)}>Cancel</button>
          </div>
        ) : (
          <p ref={textareaRef} className="white">{props.item.message}</p>
        )}
      </div>
      <div className="editMessage">
        {UserId === props.item.UserId ? 
        <>
         <IconButton onClick={manageProfileDropdown}>
         <EditIcon />
       </IconButton>
       <Menu
         anchorEl={anchorEl}
         keepMounted
         open={Boolean(anchorEl)}
         onClose={handleClose}
       >
         <MenuItem
           value={props.item.id}
           data-roomid={props.item.RoomId}
           style={{ color: "red" }}
           onClick={handleDeleteMessage}
         >
           Delete Message
         </MenuItem>
         <MenuItem
           value={props.item.id}
           data-roomid={props.item.RoomId}
           onClick={handleEditopen}
         >
           Edit Message
         </MenuItem>
       </Menu></>: <></>}
       
      </div>
    </div>
  );
}
