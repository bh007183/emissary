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
import { setFriends } from "../../store/userActions";
import AddConnect from "../../components/AddConnect/index";
import { setRooms, setNotifications } from "../../store/socketActions";
import { Route, Link, useRouteMatch, Switch } from "react-router-dom";
import { setMessagesNEW } from "../../store/messageActions";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Notifications from "../../components/Notifications";

let socket;

export default function UserDash() {
  const dispatch = useDispatch();

  const Rooms = useSelector((state) => state.Store.Socket.Rooms);
  const roomRef = useRef({});
  const notificationRef = useRef()

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
      console.log(friends)
      dispatch(setFriends(friends));
    });
    socket.on("Notification", async (notification) => {
      dispatch(setNotifications(notification));
      console.log(notificationRef.current)
      notificationRef.current.classList.add("newNotification")
    });
    socket.on("RoomCreated", function (NewRoom) {
      console.log(NewRoom);
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

  // Component Handler

  let { path, url } = useRouteMatch();


  // Removes newMessage class once clicked if newMessage exists
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

        <div id="search" className="centerFlex">
          
        </div>
        <div id="notifications">
          <Link to={`${url}/handleNotifications`}>
          <IconButton onClick={removeNewNotificationDisplay} ref={notificationRef}>
            <NotificationsActiveIcon />
          </IconButton>
          </Link>
        </div>
        <div id="profile" className="centerFlex">
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div id="dashBoard">
        <div id="roomColumn">
          {Rooms.map((room, index) => {
            return (
              <Link key={room.id} to={`${url}/cli/${room.id}`}>
                <button
                  onClick={removeNewMessageDisplay}
                  className="roomButton"
                  ref={(element) => (roomRef.current[room.id] = element)}
                  value={room.id}
                >
                  <div id="partNames">
                    {room.Users.map(
                      (user) => user.firstName + " " + user.lastName
                    )}
                  </div>
                  <div className="messageIndicator"></div>
                </button>
              </Link>
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
