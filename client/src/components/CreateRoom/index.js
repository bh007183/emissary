import React, { useState, useRef} from "react";
import "./style.css";
import { useSelector} from "react-redux";
import { Link, useRouteMatch} from "react-router-dom";

export default function CreateRoom(props) {
 

  const [friends, setFriend] = useState([]);
  const [selected, setSelected] = useState([]);
  const friendArray = useSelector((state) => state.Store.User.Friends);
  const inputVal = useRef(null)



  const handleSearch = async (event) => {
    let value = event.target.value;
    // await setSearch(value)
    console.log(value);
    await setFriend(
      await friendArray.filter(function (friend) {
        if (value === "") {
        } else {
          if (
            friend.firstName.toLowerCase().includes(value.toLowerCase()) ||
            (friend.lastName.toLowerCase().includes(value.toLowerCase()) &&
              friend !== null)
          ) {
            return friend;
          }
        }
      })
    );
  };


  const handleSelected = (event) => {
    let flag = false;
    for (let i = 0; i < selected.length; i++) {
      if (event.target.value === selected[i].id) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      setSelected([
        ...selected,
        { id: event.target.value, name: event.target.innerText },
      ]);
      setFriend([])
      inputVal.current.value = ''
    }
  };

  const handleCreateRoom = (event) => {
    
    props.socket.emit("create",selected)
    
  }

  const handleRemoveSelected = (event) => {
    setSelected(selected.filter((friend) => friend.id !== event.target.value));
  };


  return (
    <div id="userController">
      <div id="friendSearch">
        <p className="centerAndAlignFlex white" style={{ width: "60px" }}>
          To:
        </p>

        <div id="selecties">
          {selected.map((selected) => (
            <div key={selected.id}className="centerAndAlignFlex white selected">
              <div style={{whiteSpace: "nowrap"}}>{selected.name}</div>
              <button
                onClick={handleRemoveSelected}
                value={selected.id}
                className="removeSelected"
              >
                x
              </button>
            </div>
          ))}
        </div>

        <input
          onChange={handleSearch}
          ref={inputVal}
          className="white"
          id="searchFriendInput"
          placeholder="Name"
        ></input>
        <button id="createRoom" onClick={handleCreateRoom}>CreateRoom</button>
      </div>
      <div id="dropDownContainer">
        {friends.map((person) => (
          <button
            key={person.id}
            onClick={handleSelected}
            value={person.id}
            className="selectPerson white"
          >
            {person.firstName + " " + person.lastName}
          </button>
        ))}
      </div>

      <div id="findFriendTextBlock">
        <p className="white" style={{textAlign: "center"}}>
          Not seeing the right person?
        </p>
        <div className="centerFlex">
         <Link to={`/userDashBoard/addContact`}>
          <button className="glow-on-hover">Send Connection Request</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
