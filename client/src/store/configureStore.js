import {configureStore} from "@reduxjs/toolkit"
import reducer from "./reducer"
import {api} from "./Middleware/api"

export default function(){
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api)
    })
}