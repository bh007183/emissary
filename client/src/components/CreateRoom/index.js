import React, {useState, useEffect} from 'react'
import "./style.css"
import {useSelector, useDispatch} from "react-redux"

export default function CreateRoom() {
    const dispatch = useDispatch()

    const [friends, setFriend] = useState([])
    const friendArray = useSelector(state => state.Store.User.Friends)

    const handleSearch = async (event) => {
        
        let value = event.target.value
        // await setSearch(value)
        console.log(value)
        await setFriend( await friendArray.filter(function(friend){
            if(value === ''){

            }else{
                if(friend.firstName.toLowerCase().includes(value.toLowerCase()) || friend.lastName.toLowerCase().includes(value.toLowerCase()) && friend !== null){
                    return friend
                }
            }
            
            
        }))
       
        
    }
   
   

    return (
        <div id="userController">
            <div id="friendSearch">
                <div className="centerAndAlignFlex white">
                    To:
                </div>
                <input  onChange={handleSearch} className="white" id="searchFriendInput" placeholder="Name"></input>

            </div>
            <div>
                {friends.map(person => <p>{person.firstName + " " + person.lastName}</p>)}
            </div>

            <div id="findFriendTextBlock">
                <p className="white" id="">Not seeing the right person?</p>
                <div className="centerFlex">
                <button className="white"id="searchForFriendButton">Add friend</button>
                </div>
                
            </div>

            
            
        </div>
    )
}
