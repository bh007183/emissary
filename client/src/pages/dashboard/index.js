import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ReadWrite from "../../components/ReadWrite";
import CreateRoom from "../../components/CreateRoom";
import { setFriends, addNewFriends, setUserId, removedFriend, getUser } from "../../store/userActions";
import AddConnect from "../../components/AddConnect/index";
import {setMessagesAfterDelete,setMessagesAfterEdit,} from "../../store/messageActions";
import {setRooms,setNotifications,unshiftRooms} from "../../store/socketActions";
import { Route, Link, useRouteMatch, Switch } from "react-router-dom";
import { setMessagesNEW } from "../../store/messageActions";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Notifications from "../../components/Notifications";
import {useSocketContext} from "../../context/socketContext"
import RoomButtons from "../../components/RoomButtons";
import ManageConnections from "../../components/ManageConnections"
import ManageAccount from "../../components/manageAccount";


export default function UserDash() {
  const dispatch = useDispatch();

  const Rooms = useSelector((state) => state.Store.Socket.Rooms);
  
  
  
  const roomRef = useRef({});
  const notificationRef = useRef();
  const {socket} = useSocketContext()
 

  useEffect(() => {
   

    socket.on("Friends", async (friends) => {
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
    socket.on("SetRooms", function (data) {
      dispatch(setRooms(data.rooms));
      dispatch(setUserId(data.userId));
    });
    socket.on("UnshiftFriend", function (friend) {
      dispatch(addNewFriends(friend));
    });
    socket.on("REMOVE_DELETED_MESSAGE", function (data) {
      if (data.roomId === window.location.pathname.split("/")[3]) {
        dispatch(setMessagesAfterDelete(data));
      }
    });
    socket.on("INSERT_EDITED_MESSAGE", function (data) {
      if (data.roomId === window.location.pathname.split("/")[3]) {
        dispatch(setMessagesAfterEdit(data));
      }
    });
    socket.on("DISCONNECT_SUCCESS", function (data) {
      dispatch(removedFriend(data))
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
  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
    handleClose()
  }

  // DOM

  // Component Handler

  let { path, url } = useRouteMatch();

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
            <Link className="white" style={{textDecoration: "none"}}to="/userDashBoard/manageaccount">
            <MenuItem onClick={handleClose}>Manage account</MenuItem>
            </Link>
            <Link className="white" style={{textDecoration: "none"}}to="/userDashBoard/manageConnections">
            <MenuItem onClick={handleClose}>Delete Connections</MenuItem>
            </Link>
            <Link className="white" style={{textDecoration: "none"}}to="/userDashBoard/addContact">
            <MenuItem onClick={handleClose}>Add Connections</MenuItem>
            </Link>
            <Link className="white" style={{textDecoration: "none"}}to="/userDashBoard/createRoom">
            <MenuItem onClick={handleClose}>Start Conversation</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div id="dashBoard">
        <div id="roomColumn">
          {Rooms.map((room, index) => {
            return (
              <RoomButtons
                key={index}
                room={room}
                roomRef={roomRef}
              />
            );
          })}
        </div>
        <Switch>
          <Route exact path={`${path}/cli/:id`}>
            <ReadWrite />
          </Route>
          <Route exact path={`${path}/createRoom`}>
            <CreateRoom />
          </Route>
          <Route exact path={`${path}/addContact`}>
            <AddConnect/>
          </Route>
          <Route exact path={`${path}/handleNotifications`}>
            <Notifications />
          </Route>
          <Route exact path={`${path}/manageConnections`}>
            <ManageConnections />
          </Route>
          <Route exact path={`${path}/manageaccount`}>
            <ManageAccount />
          </Route>
        </Switch>
      </div>
    </>
  );
}
