import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('x-auth-token'),
    user: localStorage.getItem('user-data'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem("x-auth-token", action.payload);
            } else {
                localStorage.removeItem("x-auth-token");
            }
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("x-auth-token")
        },
    },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;