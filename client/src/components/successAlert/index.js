import React from 'react'
import "./style.css"
import {useDispatch, useSelector} from "react-redux"
import {clearSuccess} from "../../store/userActions"
export default function Success(props) {
    const dispatch = useDispatch()
    return (
        <div id="successBanner">
           
                <p id="successText">{props.message}</p>
                <button onClick={()=> dispatch(clearSuccess())}id="clearButton">x</button>
           
            
        </div>
    )
}