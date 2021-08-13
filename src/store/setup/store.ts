import { configureStore } from '@reduxjs/toolkit';
import {
  RootStateOrAny,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import roomReducer from '../room/roomSlice';
import userReducer from '../user/userSlice';
import questionsReducer from '../questions/questionsSlice';

const store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
    questions: questionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootStateOrAny> = useSelector;

export default store;
