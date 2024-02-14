import { configureStore } from "@reduxjs/toolkit";
import dstepSlice from "../features/dstepSlice.js"
export const store=configureStore({
    reducer:dstepSlice
})