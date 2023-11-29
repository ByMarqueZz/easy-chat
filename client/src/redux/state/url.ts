import { createSlice } from "@reduxjs/toolkit";

const initial_state = 'http://127.0.0.1:5000'
// const initial_state = 'http://localhost:1111'

export const urlSlice = createSlice({
    name: 'url',
    initialState: initial_state,
    reducers: {},
});