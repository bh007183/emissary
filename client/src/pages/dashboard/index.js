import React, { useEffect, useState } from "react";
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
import { setRooms } from "../../store/socketActions";
import { Route, Link, useRouteMatch, Switch } from "react-router-dom";

let socket;

export default function UserDash() {
  const dispatch = useDispatch();

  const Rooms = useSelector((state) => state.Store.Socket.Rooms);
  console.log(Rooms);
  // Socket Initiator and Listener
  useEffect(() => {
    dispatch(clearRoute());
    console.log("test");
    socket = io("http://localhost:8080", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socket.connect();

    socket.on("connect", (data) => {
      console.log("client Connected");
    });

    socket.on("Friends", async (friends) => {
      dispatch(setFriends(friends));
    });
    socket.on("RoomCreated", function (NewRoom) {
      console.log(NewRoom);
    });
    socket.on("Error", function (Err) {
      console.log(Err);
    });
    socket.on("SetRooms", function (Rooms) {
      dispatch(setRooms(Rooms));
    });
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Component Handler

  let { path, url } = useRouteMatch();



  return (
    <>
      <div id="navbar">
        <div id="newConvo" className="centerFlex">
        {/* onClick={setCurrentComponent} */}
        <Link to={`${url}/createRoom`}>
          <IconButton >
            <AddIcon />
          </IconButton>
          </Link>
        </div>

        <div id="search" className="centerFlex">
          <input id="searchInput" placeholder="Search Friends"></input>
        </div>
        <div id="profile" className="centerFlex">
          <IconButton onClick={handleClick}>
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
          {Rooms.map((room) => {
            return (
              <Link to={`${url}/cli/${room.id}`}>
                <button id="roomButton" value={room.id} key={room.id}>
                  <div id="partNames">
                    {room.Users.map(
                      (user) => user.firstName + " " + user.lastName
                    )}
                  </div>
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
            <AddConnect />
        </Route>
        </Switch>
        {/* {componentSwitch()} */}
      </div>
    </>
  );
}
