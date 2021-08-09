import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRoute } from "../../store/userActions";
import "./style.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { io } from "socket.io-client";
import ReadWrite from "../../components/ReadWrite";
import CreateRoom from "../../components/CreateRoom";
import { setFriends, addNewFriends } from "../../store/userActions";
import AddConnect from "../../components/AddConnect/index";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  setRooms,
  setNotifications,
  unshiftRooms,
} from "../../store/socketActions";
import { Route, Link, useRouteMatch, Switch } from "react-router-dom";
import { setMessagesNEW } from "../../store/messageActions";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Notifications from "../../components/Notifications";
//

import Fade from "@material-ui/core/Fade";

let socket;

export default function UserDash() {
  const dispatch = useDispatch();

  const Rooms = useSelector((state) => state.Store.Socket.Rooms);
  const roomRef = useRef({});
  const closeDeleteRef = useRef({});
  const deleteRef = useRef({});
  const deleteToggleRef = useRef({});
  const notificationRef = useRef();

  // Socket Initiator and Listener
  useEffect(() => {
    dispatch(clearRoute());
    socket = io("http://localhost:8080", {
      path: "/socket",
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socket.connect();

    socket.on("connect", (data) => {
      console.log("client Connected");
    });

    socket.on("Friends", async (friends) => {
      console.log(friends);
      dispatch(setFriends(friends));
    });
    socket.on("Notification", async (notification) => {
      dispatch(setNotifications(notification));
      console.log(notificationRef.current);
      if (window.location.pathname !== "/userDashBoard/handleNotifications") {
        notificationRef.current.classList.add("newNotification");
      }
    });
    socket.on("RoomCreated", function (NewRoom) {
      dispatch(unshiftRooms(NewRoom));
      let roomId = NewRoom.id;

      if (NewRoom.id !== window.location.pathname.split("/")[3]) {
        roomRef.current[roomId].classList.add("newMessage");
      }
    });

    socket.on("Error", function (Err) {
      console.log(Err);
    });
    socket.on("Success", function (data) {
      alert(data);
    });
    socket.on("SetRooms", function (Rooms) {
      dispatch(setRooms(Rooms));
    });
    socket.on("UnshiftFriend", function (friend) {
      dispatch(addNewFriends(friend));
    });

    socket.on("messageTransmit", function (data) {
      if (data.RoomId === window.location.pathname.split("/")[3]) {
        dispatch(setMessagesNEW(data));
      }
      let roomId = data.RoomId;

      if (data.RoomId !== window.location.pathname.split("/")[3]) {
        roomRef.current[roomId].classList.add("newMessage");
      }
    });
    console.log("Dashboard useEffect fireing");
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const manageProfileDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // DOM

  const handleDeleteVisibility = (event) => {
    
    deleteToggleRef.current[event.currentTarget.dataset.id].style.display = "none"
      deleteRef.current[event.currentTarget.dataset.id].style.display = "block"
      closeDeleteRef.current[event.currentTarget.dataset.id].style.display = "block"

  };
  const deleteRoom = event => {
    console.log("delete")
  }
  const closeDeleteReference = (event) => {

    deleteToggleRef.current[event.currentTarget.dataset.id].style.display = "block"
      deleteRef.current[event.currentTarget.dataset.id].style.display = "none"
      closeDeleteRef.current[event.currentTarget.dataset.id].style.display = "none"

  };

  // Component Handler

  let { path, url } = useRouteMatch();

  // Removes newMessage or newNotification class once clicked if newMessage or newNotification exists
  const removeNewMessageDisplay = (event) => {
    if (event.currentTarget.classList.contains("newMessage")) {
      event.currentTarget.classList.remove("newMessage");
    }
  };
  const removeNewNotificationDisplay = (event) => {
    if (event.currentTarget.classList.contains("newNotification")) {
      event.currentTarget.classList.remove("newNotification");
    }
  };

  return (
    <>
      <div id="navbar">
        <div id="newConvo" className="centerFlex">
          <Link to={`${url}/createRoom`}>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </div>

        <div id="search" className="centerFlex"></div>
        <div className="centerAndAlignFlex" id="notifications">
          <Link to={`${url}/handleNotifications`}>
            <button
              style={{ background: "none" }}
              onClick={removeNewNotificationDisplay}
              ref={notificationRef}
            >
              <NotificationsActiveIcon />
            </button>
          </Link>
        </div>
        <div id="profile" className="centerAndAlignFlex">
          <IconButton onClick={manageProfileDropdown}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            // id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Manage account</MenuItem>
            <MenuItem onClick={handleClose}>Manage Connections</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div id="dashBoard">
        <div id="roomColumn">
          {Rooms.map((room, index) => {
            return (
              <div key={room.id} className="roomButtonContain">
                <Link className="link"  to={`${url}/cli/${room.id}`}>
                  <div
                    onClick={removeNewMessageDisplay}
                    className="roomButton"
                    ref={(element) => (roomRef.current[room.id] = element)}
                    value={room.id}
                  >
                    <div id="partNamesRow">
                      {room.Users.map((user) => (
                        <p className="partName">
                          {user.firstName + " " + user.lastName}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
                <div
                  className="deleteToggle"
                  data-id={room.id}
                  onClick={handleDeleteVisibility}
                  style={{ display: "block"}}
                  ref={(element) => (deleteToggleRef.current[room.id] = element)}
                >
                <MoreVertIcon style={{marginTop: "50%", marginRight: "10px", marginLeft: "10px"}}/>
                </div>
                <div
                onClick={deleteRoom }
                data-id={room.id}
                  className="deleteToggleOpen"
                  style={{ display: "none"}}
                  ref={(element) => (deleteRef.current[room.id] = element)}
                >
                 <p style={{margin: 0}}>Delete</p> 
                  
                </div>
                <div
                data-id={room.id}
                onClick={closeDeleteReference }
                  className="closeDelete"
                  style={{ display: "none"}}
                  ref={(element) => (closeDeleteRef.current[room.id] = element)}
                >
                  <MoreVertIcon style={{marginTop: "50%", marginRight: "10px", marginLeft: "10px"}} />
                  
                </div>
              </div>
            );
          })}
        </div>
        <Switch>
          <Route exact path={`${path}/cli/:id`}>
            <ReadWrite socket={socket} />
          </Route>
          <Route exact path={`${path}/createRoom`}>
            <CreateRoom socket={socket} />
          </Route>
          <Route exact path={`${path}/addContact`}>
            <AddConnect socket={socket} />
          </Route>
          <Route exact path={`${path}/handleNotifications`}>
            <Notifications socket={socket} />
          </Route>
        </Switch>
      </div>
    </>
  );
}
