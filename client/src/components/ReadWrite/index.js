import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { getMessages } from "../../store/messageActions";
import { useDispatch, useSelector } from "react-redux";
import Messages from "../Messages";
import GifIcon from "@material-ui/icons/Gif";
import { useSocketContext } from "../../context/socketContext";
import Modal from "@material-ui/core/Modal";
import axios from "axios"
import "./style.css";
export default function ReadWrite() {
  const [open, setOpen] = React.useState(false);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.Store.Message.Messages);
  console.log(messages);
  console.log("logs messages that should be visible");
  const { socket } = useSocketContext();

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
  };
  const [message, setMessage] = useState({
    roomId: "",
    message: "",
    giff: ""
  });
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessage({ ...message, roomId: window.location.pathname.split("/")[3] });
    dispatch(getMessages(window.location.pathname.split("/")[3]));
    socket.emit("joinRoom", window.location.pathname.split("/")[3]);
  }, [window.location.pathname]);

  const handleSubmit = (event) => {
    event.preventDefault();

    socket.emit("sendMessage", message);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //  Modal
  const [search, setSearch] = useState(null)
  const [results, setResults] = useState([])


 
  const handleChange = async (event) => {
      
      setSearch(event.target.value)
  }
  const handleSearch = async (event) => {
      let res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_APIKEY}&q=${search}&rating=pg`).catch(err => console.log(err))
      setResults(res.data.data)
      console.log(res.data.data)
      
  }

  const selectGif = (event) => {
      
      setMessage({ ...message, giff: event.currentTarget.dataset.url})
      handleClose()

  }
//////////return
  return (
    <div id="messageController">
      <div id="messageCardContainer">
        {messages.map((item) => (
          <Messages key={item.id} socket={socket} item={item} />
        ))}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br ref={scrollRef}></br>
      </div>

      <div id="formContainer">
        <form onSubmit={handleSubmit} id="messageForm">
          {message.giff ? 
          // <div>
            <div id="giff" style={{backgroundImage: `url(${message.giff})`}} >
              <img src={message.giff} style={{visibility: "hidden"}}></img>
              <button onClick={() => setMessage({...message, giff: ""})} type="button" id="removeGiff">x</button>
            </div>
            

          // </div> 
          : 
          <></>
          }
          
          <textarea
            id="input"
            placeholder="type here..."
            onChange={(event) =>
              setMessage({ ...message, message: event.target.value })
            }
            value={message.message}
            rows="2"
            onKeyUp={handleKeyDown}
          ></textarea>
          <div id="formBar">
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <GifIcon />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div id="GifModal">
            <div className="centerFlex">
            <div id="gifResult">
                {results.length ? results.map(gif => <img onClick={selectGif} data-url={gif.images.fixed_width.url} src={gif.images.fixed_width.url}></img>) : <></>}

            </div>
            </div>
            <div id="gifInputContain">
            <input onChange={handleChange} placeholder="Search Gif" id="gifInput"></input> <button onClick={handleSearch}>Enter</button>
            </div>
        </div>
            </Modal>
          </div>
        </form>
      </div>
    </div>
  );
}
