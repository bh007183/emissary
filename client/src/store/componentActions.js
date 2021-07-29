import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "Component",
    initialState: {
        Rendered: "ReadWrite"
    },
    reducers:{
        setComponent: function(Component, action){
            Component.Rendered = action.payload

        }
    }
})

export const {setComponent} = slice.actions

export default slice.reducer