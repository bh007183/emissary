import React, {useState} from "react";
import "./style.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from '@material-ui/icons/Edit';

export default function Messages(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
        
      };
     

      const handleDeleteMessage = (event) => {
          let obj = {
              messageId: event.currentTarget.value,
              roomId: event.currentTarget.dataset.roomid
          }
          props.socket.emit("DELETE_MESSAGE", obj)
          handleClose()
      }
      const manageProfileDropdown = (event) => {
        setAnchorEl(event.currentTarget);
      };
  return (
    <div className="messageCard">
      <div className="imageContain">purple</div>
      <div className="textBlock">
        <p style={{ color: "wheat" }}>{props.item.author}</p>
        <p className="white">{props.item.message}</p>
      </div>
      <div className="editMessage">
      <IconButton onClick={manageProfileDropdown}>
            <EditIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem value={props.item.id} data-roomid={props.item.RoomId} style={{color: "red"}} onClick={handleDeleteMessage}>Delete Message</MenuItem>
            <MenuItem onClick={handleClose}>Edit Message</MenuItem>
          </Menu>

      </div>
    </div>
  );
}
