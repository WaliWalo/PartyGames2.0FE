import { IQuestion } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../setup/store';

type QuestionState =
  | { questions: [] }
  | { status: 'ok'; questions: Array<IQuestion> }
  | { status: 'loading' }
  | { status: 'error'; error: object };

const initialState: QuestionState = { questions: [] } as QuestionState;

const questionsSlice = createSlice({
  name: 'questions',
  initialState: initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Array<IQuestion>>) =>
      (state = { status: 'ok', questions: action.payload }),
    setError: (state, action: PayloadAction<object>) =>
      (state = { status: 'error', error: action.payload }),
    setLoading: (state) => (state = { status: 'loading' }),
    unsetQuestions: (state) => (state = { questions: [] }),
  },
});

export const getQuestionsAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/questions`);
    if (response.ok) {
      dispatch(setQuestions(await response.json()));
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
const { actions, reducer } = questionsSlice;
// Extract and export each action creator by name
export const { setQuestions, setLoading, setError, unsetQuestions } = actions;

export default reducer;
