import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "User",
    initialState: {
        name: ""
    },
    reducers: {
        setName: (User, action) => {
           User.name = action.payload
        }
    }
})
export const {setName} = slice.actions
export default slice.reducer