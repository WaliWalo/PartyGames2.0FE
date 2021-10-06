import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../setup/store';
import { IRoom } from './types';

type RoomState =
  | { inRoom: false }
  | { inRoom: true; room: IRoom; status: 'ok' }
  | { status: 'loading' }
  | { status: 'error'; error: object };

const initialState: RoomState = { inRoom: false } as RoomState;

const roomSlice = createSlice({
  name: 'rooms',
  initialState: initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<IRoom>) =>
      (state = { status: 'ok', inRoom: true, room: action.payload }),
    setError: (state, action: PayloadAction<object>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
    unsetRoom: (state) => (state = { inRoom: false }),
  },
});

export const getRoomAsync = () => async (dispatch: AppDispatch) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    try {
      dispatch(setLoading());
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/rooms/${userId}`
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(setRoom(data));
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
const { actions, reducer } = roomSlice;
// Extract and export each action creator by name
export const { setRoom, setLoading, setError, unsetRoom } = actions;

export default reducer;
