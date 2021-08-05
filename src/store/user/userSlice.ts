import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../setup/store';
import { IUser } from './types';

type UserState =
  | { enteredGame: false }
  | { enteredGame: true; user: IUser; status: 'ok' }
  | { status: 'loading' }
  | { status: 'error'; error: object };

const initialState: UserState = { enteredGame: false } as UserState;

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) =>
      (state = { status: 'ok', enteredGame: true, user: action.payload }),
    setError: (state, action: PayloadAction<object>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
    unsetUser: (state) => (state = { enteredGame: false }),
  },
});

export const getUserAsync = () => async (dispatch: AppDispatch) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    try {
      dispatch(setLoading());
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${userId}`
      );
      if (response.ok) {
        dispatch(setUser(await response.json()));
      } else {
        const err = { status: response.status, message: response.statusText };
        dispatch(setError(err));
      }
    } catch (error) {
      const err = { status: 500, message: 'Please try again later' };
      dispatch(setError(err));
    }
  }
};

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { setUser, setLoading, setError, unsetUser } = actions;

export default reducer;
