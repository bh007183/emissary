import React, {useState} from 'react'
import "./style.css"
import {useDispatch, useSelector} from "react-redux"
import {useSocketContext} from "../../context/socketContext"

export default function ManageConnections() {
    const connections = useSelector(state => state.Store.User.Friends)
    const {socket} = useSocketContext()
    const [friends, setFriend] = useState([]);
    const handleSearch = async (event) => {
        let value = event.target.value;
        // await setSearch(value)
        console.log(value);
        await setFriend(
          await connections.filter(function (friend) {
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
    const handleDisconnect = (event) => {
        socket.emit("DISCONNECT", event.target.value)

    }
      
    return (
        <div id="searchConnectionsContain">
            <div id="searchConnections">
                <p className="centerAndAlignFlex  white"style={{width: "70px"}}>Search:</p>
                <input onChange={handleSearch} placeholder="Name" id="searchConnectionInput">
                </input>
            </div> 
            <br></br>
            <br></br>
            <br></br>
            
            
            <div id="connectionList">
                {!friends.length ? connections.map(friend => 
                <div className="listOfConnections">
                    <p>{friend.firstName + " " + friend.lastName}</p>
                    <button onClick={handleDisconnect} value={friend.id} className="disconnect">DisConnect</button>
                </div>
                    
                    ): friends.map(friend => 
                        <div className="listOfConnections">
                            <p>{friend.firstName + " " + friend.lastName}</p>
                            <button onClick={handleDisconnect} value={friend.id}className="disconnect">DisConnect</button>
                        </div>)}

            </div>
        </div>
    )
}
