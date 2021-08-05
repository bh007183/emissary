import React, { useState } from "react";
import "./style.css";

import { findConnection, clearSuccess } from "../../store/userActions";
import { useDispatch, useSelector } from "react-redux";
import Error from "../ErrorAlert/Error";
import Success from "../SuccessAlert";

export default function AddConnect(props) {
  const [connection, setConnection] = useState(null);
  const dispatch = useDispatch();
  const results = useSelector(
    (state) => state.Store.User.ConnectionSearchResults
  );
  const success = useSelector((state) => state.Store.User.Success);
  const error = useSelector((state) => state.Store.User.Error);
  const handleSearch = (event) => {
    console.log(connection);
    dispatch(findConnection(connection));
  };
  const handleChange = (event) => {
    setConnection(event.target.value);
  };
  const handleAddFriend = (event) => {
    props.socket.emit("addConnection", {
      friendId: event.target.value,
      friendName: event.target.name,
      friendSocket: event.target.dataset.socketid,
    });
  };
  console.log(results);
  return (
    <div id="AddFriendContainer">
      <div id="addConnectionSearch">
        <p className="centerAndAlignFlex white" style={{ width: "100px" }}>
          Search:
        </p>
        <input
          onChange={handleChange}
          className="white"
          id="searchConnectionInput"
          placeholder="Name"
        ></input>
        <button onClick={handleSearch} id="searchButton" className="white">
          Search
        </button>
      </div>
      <div id="dropDownContainer2">
        {results[0] === "No Matching Results." ? (
          <button className="selectPerson2 white">{results[0]}</button>
        ) : (
          results.map((person) => (
            <button
              key={person.id}
              onClick={handleAddFriend}
              value={person.id}
              name={person.firstName + " " + person.lastName}
              data-socketid={person.socketId}
              className="selectPerson2 white"
            >
              {person.firstName + " " + person.lastName}
            </button>
          ))
        )}
      </div>

      <div id="messageContainer">
        {success ? (
          <Success message={success} />
        ) : error ? (
          <Error message={error} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
