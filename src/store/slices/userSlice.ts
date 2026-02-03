import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userActions } from '@/api';

import { type AuthPayload, type AuthResponse } from '@/types';

type UserState = {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};

const getInitialToken = () => localStorage.getItem('token');

const initialState: UserState = {
    token: getInitialToken(),
    isAuthenticated: Boolean(getInitialToken()),
    loading: false,
    error: null,
};

const loginUser = createAsyncThunk<AuthResponse, AuthPayload, { rejectValue: string }>(
    'user/login',
    async (payload, thunkApi) => {
        try {
            const data = await userActions.login(payload);
            return data;
        } catch {
            return thunkApi.rejectWithValue('Login failed');
        }
    }
);

const registerUser = createAsyncThunk<AuthResponse, AuthPayload, { rejectValue: string }>(
    'user/register',
    async (payload, thunkApi) => {
        try {
            const data = await userActions.register(payload);
            return data;
        } catch {
            return thunkApi.rejectWithValue('Register failed');
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('token');
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            //login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })

            //register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Register failed';
            });
    },
});

export const { logout, setToken } = userSlice.actions;
export { loginUser, registerUser };
export default userSlice.reducer;