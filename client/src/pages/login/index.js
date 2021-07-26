
import React, { useState, useRef } from "react";
import handleChange from "../../helper/handleChange";
import {useDispatch, useSelector} from "react-redux"
import "./style.css";
import Error from "../../components/errorAlert/Error"
import BounceButton from "../../components/accountCreated";
import {Link} from "react-router-dom"

export default function Login() {
    const dispatch = useDispatch()
    const apiError = useSelector(state => state.Store.User.Error)
    const apiSuccess = useSelector(state => state.Store.User.Success)
    const [login, setLogin] = useState({
        email: "",
        password: "",
      });
      const handleSubmit = (event) => {
        event.preventDefault()
        dispatch()
    }
    return (
        <main id="loginMain">
        {apiError ? <Error message={apiError}/> : <></>}
        {apiSuccess ? <BounceButton/> : <></>}
      <header id="entryHeader">
        <div className="centerFlex">
          <h4
            style={{
              margin: 0,
              color: "white",
              fontSize: "4vw",
              marginTop: "15px",
            }}
          >
            Welcome Emissary!
          </h4>
        </div>
        <div className="centerFlex">
          <h5 style={{ color: "white", margin: "5px" }}>
            Enter your credentials to login.
          </h5>
        </div>
      </header>
      

      <section className="formContainerCenter2">
        <form onSubmit={handleSubmit}>
          <div className="centerFlex">
            <input style={{marginTop: "50px"}} onChange={(event)=> handleChange(event, login, setLogin)} name="email" value={login.email} className="entryInput" placeholder="Email"></input>
          </div>
          <div className="centerFlex">
            <input
            onChange={(event)=> handleChange(event, login, setLogin)}
            name="password"
            value={login.value}
              className="entryInput"
              placeholder="Password"
              type="password"
            ></input>
          </div>
          <div>
            <button style={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translate(-50%, -90%)",
            }}>Login</button>
            <Link style={{
              position: "absolute",
              bottom: "0px",
              left: "5px",
              
            }}to="/createAccount">
                <p style={{fontSize: "10px"}}>create account</p>
            </Link>
          </div>
        </form>
      </section>
    </main>
            
        
    )
}
