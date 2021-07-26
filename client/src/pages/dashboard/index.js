import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {clearRoute} from "../../store/userActions"

export default function UserDash() {

    const dispatch = useDispatch()
    
    console.log("render?")
   
    useEffect(() => {
        dispatch(clearRoute())
       console.log("test")

    }, [])
    
    return (
        <div>
            You are logged in
        </div>
    )
}
