import React from 'react'
import "./style.css"
import {useDispatch} from "react-redux"
import {clearError} from "../../store/userActions"
export default function Error(props) {
    const dispatch = useDispatch()
    return (
        <div id="errorBanner">
           
                <p id="errorText">{props.message}</p>
                <button onClick={()=> dispatch(clearError())}id="clearButton">x</button>
           
            
        </div>
    )
}
