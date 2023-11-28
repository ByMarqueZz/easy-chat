import { createSlice } from "@reduxjs/toolkit";

const initial_state = 'https://cloudinghub.com:1111'
// const initial_state = 'http://localhost:1111'

export const urlSlice = createSlice({
    name: 'url',
    initialState: initial_state,
    reducers: {},
});