import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './types';

type UserState =
  | { enteredGame: false }
  | { enteredGame: true; user: IUser; status: 'ok' }
  | { status: 'loading' }
  | { status: 'error'; error: string };

const initialState: UserState = { enteredGame: false } as UserState;

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) =>
      (state = { status: 'ok', enteredGame: true, user: action.payload }),
    setError: (state, action: PayloadAction<string>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
    unsetUser: (state) => (state = { enteredGame: false }),
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { setUser, setLoading, setError, unsetUser } = actions;

export default reducer;
