import React, { useState, useRef} from "react";
import "./style.css";
import { useSelector} from "react-redux";
import { Link, useRouteMatch} from "react-router-dom";
import {useSocketContext} from "../../context/socketContext"
import Modal from '@material-ui/core/Modal';


export default function CreateRoom() {
 
  const[open, setOpen ]= useState(false)
  const[roomName, setRoomName ]= useState(null)
  const [friends, setFriend] = useState([]);
  const [selected, setSelected] = useState([]);
  const friendArray = useSelector((state) => state.Store.User.Friends);
  const inputVal = useRef(null)
  const {socket} = useSocketContext()



  const handleSearch = async (event) => {
    let value = event.target.value;
  
  
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
const handleNameRoom = (event) => {
  setRoomName(event.target.value)

}

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
   
    if(selected.length ===0 ){
      alert("You cannot create a conversation with only yourself. Make sure to add others")
    }else{
      socket.emit("create",{people:selected, roomName: roomName})
    }
    setOpen(false)
    
    
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveSelected = (event) => {
    setSelected(selected.filter((friend) => friend.id !== event.target.value));
  };

  const body = (
    <div >
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
     
    </div>
  );
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
        <button id="createRoom" onClick={handleOpen}>Create Room</button>
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
      <div id="searchFriendsText" className="centerFlex">
        <span className="white">Search for your connections above</span>

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <div id="modalContain">
            <p>Set Room Name</p>
            <div id="confirmEditInput" className="centerFlex">
              <input
                onChange={handleNameRoom}
                
                placeholder="Name Room"
                value={roomName}
              ></input>
            </div>
            <div id="confirmEditButton" className="centerFlex">
              <button onClick={handleCreateRoom} >Submit</button>
            </div>
          </div>
      </Modal>
    </div>
  );
}
