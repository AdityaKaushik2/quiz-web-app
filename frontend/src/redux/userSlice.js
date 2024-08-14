// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    token: null,
    profile: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
    },
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        clearCredentials: (state) => {
            state.userId = null;
            state.token = null;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setCredentials, clearCredentials, setProfile, setStatus, setError } = userSlice.actions;


export default userSlice.reducer;
