import { configureStore } from "@reduxjs/toolkit";
import {  urlSlice } from "./state";
// import { Redux } from "@/interfaces/";

export default configureStore({
    reducer: {
        url: urlSlice.reducer,
    }
});