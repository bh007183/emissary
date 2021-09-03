import React, { useState} from "react";
import handleChange from "../../helper/handleChange";
import {useDispatch, useSelector} from "react-redux"
import {createUser} from "../../store/userActions"
import "./style.css";
import Error from "../../components/ErrorAlert/Error"
import BounceButton from "../../components/AccountCreated";
import {Link} from "react-router-dom"

export default function EntryPoint() {
    const dispatch = useDispatch()
    const apiError = useSelector(state => state.Store.User.Error)
    const apiSuccess = useSelector(state => state.Store.User.Success)
   
  const [createAccount, setAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
      event.preventDefault()
      dispatch(createUser(createAccount))
  }

  return (
    <main id="CreateAccountMain">
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
            Enter your information below to embark on your journey.
          </h5>
        </div>
      </header>
      

      <section className="formContainerCenter">
        <form id="createAccountForm" onSubmit={handleSubmit}>
          <div className="centerFlex">
            <input
            onChange={(event)=> handleChange(event, createAccount, setAccount)}
              className="entryInput"
              style={{ marginTop: "25px" }}
              placeholder="First Name"
              name="firstName"
              value={createAccount.firstName}
            ></input>
          </div>
          <div className="centerFlex">
            <input onChange={(event)=> handleChange(event, createAccount, setAccount)} name="lastName" value={createAccount.lastName} className="entryInput" placeholder="Last Name"></input>
          </div>
          <div className="centerFlex">
            <input onChange={(event)=> handleChange(event, createAccount, setAccount)} name="email" value={createAccount.email} className="entryInput" placeholder="Email"></input>
          </div>
          <div className="centerFlex">
            <input
            onChange={(event)=> handleChange(event, createAccount, setAccount)}
            name="password"
            value={createAccount.value}
              className="entryInput"
              placeholder="Password"
              type="password"
            ></input>
          </div>
          <div
            
          >
            <div className="centerFlex">
            <button id="creatAccountButton"
            >Create</button>
            </div>
            <Link style={{
              position: "absolute",
              bottom: "0px",
              left: "5px",
              color: "white"
              
            }}to="/">
                <p style={{fontSize: "10px"}}>back to login</p>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
