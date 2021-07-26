import {createAction} from "@reduxjs/toolkit"

export const apiStart = createAction("api/Start")
export const apiSuccess = createAction("api/Success")
export const apiError = createAction("api/Error")