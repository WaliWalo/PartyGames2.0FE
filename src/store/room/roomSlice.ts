import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom } from './types';

type RoomState =
  | { inRoom: false }
  | { inRoom: true; room: IRoom; status: 'ok' }
  | { status: 'loading' }
  | { status: 'error'; error: string };

const initialState: RoomState = { inRoom: false } as RoomState;

const roomSlice = createSlice({
  name: 'rooms',
  initialState: initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<IRoom>) =>
      (state = { status: 'ok', inRoom: true, room: action.payload }),
    setError: (state, action: PayloadAction<string>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
    unsetRoom: (state) => (state = { inRoom: false }),
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = roomSlice;
// Extract and export each action creator by name
export const { setRoom, setLoading, setError, unsetRoom } = actions;

export default reducer;
