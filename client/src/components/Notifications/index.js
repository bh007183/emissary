import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  rejectFriendRequest,
  removeNotification,
} from "../../store/socketActions";
import {useSocketContext} from "../../context/socketContext"

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.Store.Socket.Notifications
  );
  console.log(notifications);
  const {socket} = useSocketContext()
  const handleAccept = (event) => {
    socket.emit("acceptedConnection", {
      id: event.target.value,
      friendSocket: event.target.dataset.rsocketid,
    });
    dispatch(removeNotification({ id: event.target.value }));
  };
  const handleReject = (event) => {
    dispatch(rejectFriendRequest({ connectionRequestid: event.target.value }));
  };
  const handleDismiss = (event) => {
    dispatch(removeNotification({ id: event.target.value }));
  };

  return (
    <div id="notificationContainer">
      {notifications.length < 1 ? (
        <p id="noNotifications">No Notifications</p>
      ) : (
        notifications.map((note) => (
          <>
            <br></br>

            <div
              key={note.friendId}
              value={note.type}
              className="notificationHandler"
            >
              <div className="notificationTextContainer">
                <p style={{ margin: "0px 0px 0px 5px" }} className="white">
                  {note.message}
                </p>
              </div>

              <div className="notificationButtonContainer">
                {note.type === "CONNECTION_REQUEST" ? (
                  <>
                    <button
                      value={note.friendId}
                      data-rsocketid={note.recipeantSocketId}
                      onClick={handleAccept}
                      id="acceptButton"
                      className="notificationHandlerButton white"
                    >
                      Accept
                    </button>
                    <button
                      value={note.friendId}
                      onClick={handleReject}
                      id="rejectButton"
                      className="notificationHandlerButton white"
                    >
                      Reject
                    </button>
                  </>
                ) : note.type === "CONNECTION_ACCEPTED" ? (
                  <button
                    onClick={handleDismiss}
                    value={note.friendId}
                    id="dismissButton"
                    className="notificationHandlerDismissButton white"
                  >
                    Dismiss
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
}
