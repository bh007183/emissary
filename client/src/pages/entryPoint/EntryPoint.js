import React, {useState} from 'react'
import handleChange from "../../helper/handleChange"
import "./style.css"


export default function EntryPoint() {
    const [createAccount, setAccount] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
        
    })

   




    return (
        <main id="CreateAccountMain">
            <header id="entryHeader">
            <div className="centerFlex">
            <h4 style={{margin: 0, color: "white", fontSize: "4vw", marginTop: "15px"}}>Welcome Emissary!</h4>
            </div>
            <div className="centerFlex">
            <h5 style={{color: "white"}}>Enter your information below to embark on your journey.</h5>
            </div>
            </header>

            <section className="formContainerCenter">
                <from>
                    <div className="centerFlex">
                    <input className="entryInput" style={{marginTop: "25px"}} placeholder="First Name"></input>
                    </div>
                    <div className="centerFlex">
                    <input className="entryInput" placeholder="Last Name"></input>
                    </div>
                    <div className="centerFlex">
                    <input className="entryInput" placeholder="Email"></input>
                    </div>
                    <div className="centerFlex">
                    <input className="entryInput" placeholder="Password"type="password"></input>
                    </div>
                    <div style={{position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, -90%)"}}>
                    <button>Create</button>
                    </div>

                </from>
            </section>
            
            
        </main>
    )
}
