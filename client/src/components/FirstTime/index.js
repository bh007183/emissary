import React, { useState, useRef } from "react";
import "./style.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function FirstTime() {
  const firstLoginRef = useRef(null);
  const conversationRef = useRef(null);
  const createConversationRef = useRef(null);
  const alertRef = useRef(null);
  const dropDownRef = useRef(null);
  const [state, setState] = useState({
    index: 0,
    text: [
      "Welcome New Emissary!",
      "This side bar will display your conversations.",
      "Click here to start a conversation.",
      "This will alert you if you have a friend request",
      "This is where you can do most of your work.",
    ],
  });

  const handleIndex = () => {
    let number = state.index;
    number++;
    if (number === 5) {
      localStorage.setItem("status", "false");
      firstLoginRef.current.setAttribute("style", "display: none");
    }
    setState({
      ...state,
      index: number,
    });
  };

  return (
    <div id="firstLogin" ref={firstLoginRef}>
      <div id="mainText">
        <h2>{state.text[state.index]}</h2>
        <div className="centerFlex">
          <button onClick={handleIndex} id="next">
            Next
          </button>
        </div>
      </div>
      {/* Mega Turnary */}
      {state.index === 1 ? (
        <ArrowBackIcon
          ref={conversationRef}
          className="bounceAnimation"
          id="sideColumnPointer"
        />
      ) : state.index === 2 ? (
        <ArrowUpwardIcon
          ref={createConversationRef}
          className="bounceAnimation"
          id="createConvoPointer"
        />
      ) : state.index === 3 ? (
        <ArrowUpwardIcon
          ref={alertRef}
          className="bounceAnimation"
          id="alertPointer"
        />
      ) : state.index === 4 ? (
        <ArrowUpwardIcon
          ref={dropDownRef}
          className="bounceAnimation"
          id="profilePointer"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
