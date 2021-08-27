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
      "Welcome New Emissary! Here is a run doun!",
      "This side bar will display your conversations and you can click on them to access it.",
      "Click here to start a conversation.",
      "If you have a connection was accepted, this will let you know",
      "This is where you can do most of your work. Edit account, send connection requests, etc.",
    ],
  });

  const handleIndex = () => {
    let number = state.index;
    number++;
    if (number === 4) {
      localStorage.setItem("status", "false");
      firstLoginRef.current.setAttribute("style", "display: none");
    }
    
    setState({
      ...state,
      index: number,
    });
    console.log(state);
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
      <ArrowBackIcon ref={conversationRef} className="bounceAnimation"id="sideColumnPointer"/>
      <ArrowUpwardIcon ref={createConversationRef}className="bounceAnimation" id="createConvoPointer"/>
      <ArrowUpwardIcon ref={alertRef}className="bounceAnimation" id="alertPointer"/>
      <ArrowUpwardIcon ref={dropDownRef} className="bounceAnimation" id="profilePointer"/>
    </div>
  );
}
