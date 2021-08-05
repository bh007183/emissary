import React, {useEffect} from 'react'
import "./style.css"
import {useDispatch, useSelector} from "react-redux"
import {rejectFriendRequest } from "../../store/socketActions"

export default function Notifications() {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.Store.Socket.Notifications)
    const handleAccept = (event) =>{

    }
    const handleReject = (event) => {
        dispatch(rejectFriendRequest({connectionRequestid: event.target.value}))

    }

    return (
        <div id="notificationContainer">
            

            {notifications.map(note => 
           
            <div key={note.friendId} value={note.type} className="notificationHandler">
                <div className="notificationTextContainer">
                <p style={{margin: "0px 0px 0px 5px"}} className="white">{note.message}</p>
                </div>
                

                <div className="notificationButtonContainer">
                    {note.type === "CONNECTION_REQUEST" ? 
                    <>
                    <button value={note.friendId} onClick={handleAccept}id="acceptButton" className="notificationHandlerButton white">Accept</button>
                    <button value={note.friendId} onClick={handleReject}id="rejectButton" className="notificationHandlerButton white">Reject</button>
                    </>
                     : note.type === "CONNECTION_ACCEPTED" ? (<button id="acceptButton" className="notificationHandlerButton white">Dismiss</button>): <></>
                }
                    

                </div>

            </div>
            )}
            
            
        </div>
    )
}
