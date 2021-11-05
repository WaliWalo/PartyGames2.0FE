import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../setup/store';
import { IMessage } from './types';

type MessageState =
  | { status: 'ok'; messages: Array<IMessage> }
  | { status: 'loading' }
  | { status: 'error'; error: object };

const initialState: MessageState = {
  status: 'ok',
  messages: [],
} as MessageState;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Array<IMessage>>) =>
      (state = {
        status: 'ok',
        messages: action.payload,
      }),
    setError: (state, action: PayloadAction<object>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
  },
});

export const getMessagesAsync =
  (roomId: String) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/messages/${roomId}`
      );
      if (response.ok) {
        dispatch(setMessages(await response.json()));
      } else {
        const err = { status: response.status, message: response.statusText };
        dispatch(setError(err));
      }
    } catch (error) {
      const err = { status: 500, message: 'Please try again later' };
      dispatch(setError(err));
    }
  };
// Extract the action creators object and the reducer
const { actions, reducer } = messagesSlice;
// Extract and export each action creator by name
export const { setMessages, setLoading, setError } = actions;

export default reducer;
