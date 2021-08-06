import React from 'react'
import "./style.css"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Link} from "react-router-dom"

export default function BounceButton() {
    return (
        <div>
            <Link to="/">
            <button id="bounceButton"><KeyboardBackspaceIcon fontSize="small"/> <p style={{margin: "2.5px"}}>Login</p></button>
            </Link>
        </div>
    )
}
