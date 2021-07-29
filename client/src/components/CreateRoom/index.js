import React, { useState, useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";

export default function CreateRoom() {
  const dispatch = useDispatch();

  const [friends, setFriend] = useState([]);
  const [selected, setSelected] = useState([]);
  const friendArray = useSelector((state) => state.Store.User.Friends);

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
    let flag = false
    for(let i = 0; i < selected.length; i++){
        if(event.target.value === selected[i].id){
             flag = true
             break;
        }
    }
      
     if(!flag){
        setSelected([
            ...selected,
            { id: event.target.value, name: event.target.innerText },
          ]);
     }
        

      
      
    
  };
  const handleRemoveSelected = event => {
     
      
      setSelected((selected.filter(friend => friend.id !== event.target.value)))
  }

  return (
    <div id="userController">
      <div id="friendSearch">
        <p className="centerAndAlignFlex white" style={{ width: "60px"}}>To:</p>

        <div id="selecties">
          {selected.map((selected) => (
            <div className="centerAndAlignFlex white selected">
              <div>{selected.name}</div>
              <button onClick={handleRemoveSelected} value={selected.id} className="removeSelected">x</button>
            </div>
          ))}
        </div>

        <input
          onChange={handleSearch}
          className="white"
          id="searchFriendInput"
          placeholder="Name"
          
        ></input>
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
        <p className="white" id="">
          Not seeing the right person?
        </p>
        <div className="centerFlex">
          <button className="glow-on-hover">Add friend</button>
        </div>
      </div>
    </div>
  );
}
