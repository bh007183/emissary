import React from 'react'
import "./style.css"

export default function CreateRoom() {
    return (
        <div id="userController">
            <div id="friendSearch">
                <div className="centerAndAlignFlex white">
                    To:
                </div>
                <input  className="white" id="searchFriendInput" placeholder="Name"></input>

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
