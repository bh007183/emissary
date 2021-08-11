import "./style.css"
import React, {  useRef } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom";
import {
    setRoomsAfterDelete
  } from "../../store/socketActions";

export default function RoomButtons(props) {
    const dispatch = useDispatch()
  
    const closeDeleteRef = useRef({});
    const deleteRef = useRef({});
    const deleteToggleRef = useRef({});

    //DOM

    const handleDeleteVisibility = (event) => {
    
        deleteToggleRef.current[event.currentTarget.dataset.id].style.display = "none"
          deleteRef.current[event.currentTarget.dataset.id].style.display = "block"
          closeDeleteRef.current[event.currentTarget.dataset.id].style.display = "block"
    
      };
      const deleteRoom = event => {
        dispatch(setRoomsAfterDelete(event.currentTarget.dataset.id))
        props.socket.emit("DELETE_ROOM", event.currentTarget.dataset.id)
        
      }
      const closeDeleteReference = (event) => {
    
        deleteToggleRef.current[event.currentTarget.dataset.id].style.display = "block"
          deleteRef.current[event.currentTarget.dataset.id].style.display = "none"
          closeDeleteRef.current[event.currentTarget.dataset.id].style.display = "none"
    
      };

        // Removes newMessage class once clicked if newMessage 
  const removeNewMessageDisplay = (event) => {
    if (event.currentTarget.classList.contains("newMessage")) {
      event.currentTarget.classList.remove("newMessage");
    }
  };
  let { path, url } = useRouteMatch();
    return (
        <div key={props.room.id} className="roomButtonContain">
                <Link className="link"  to={`${url}/cli/${props.room.id}`}>
                  <div
                    onClick={removeNewMessageDisplay}
                    className="roomButton"
                    ref={(element) => (props.roomRef.current[props.room.id] = element)}
                    value={props.room.id}
                  >
                    <div id="partNamesRow">
                      {props.room.Users.map((user, index) => (
                        <p key={index} className="partName">
                          {user.firstName + " " + user.lastName}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
                <div
                  className="deleteToggle"
                  data-id={props.room.id}
                  onClick={handleDeleteVisibility}
                  style={{ display: "block"}}
                  ref={(element) => (deleteToggleRef.current[props.room.id] = element)}
                >
                <MoreVertIcon style={{marginTop: "40%", marginRight: "10px", marginLeft: "10px"}}/>
                </div>
                <div
                onClick={deleteRoom }
                data-id={props.room.id}
                  className="deleteToggleOpen"
                  style={{ display: "none"}}
                  ref={(element) => (deleteRef.current[props.room.id] = element)}
                >
                 <p style={{margin: "0", fontSize: "24px", color: "white", marginLeft: "30%", marginTop: "15px"}}>Delete</p> 
                  
                </div>
                <div
                data-id={props.room.id}
                onClick={closeDeleteReference }
                  className="closeDelete"
                  style={{ display: "none"}}
                  ref={(element) => (closeDeleteRef.current[props.room.id] = element)}
                >
                  <MoreVertIcon style={{marginTop: "40%", marginRight: "10px", marginLeft: "10px"}} />
                  
                </div>
              </div>
    )
}
