import { createSlice } from "@reduxjs/toolkit";

// const initial_state = 'http://127.0.0.1:5000'
// const initial_state = 'http://192.168.9.84:5000'
const initial_state = 'http://192.168.208.127:5000'

export const urlSlice = createSlice({
    name: 'url',
    initialState: initial_state,
    reducers: {},
});