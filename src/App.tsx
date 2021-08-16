import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAppDispatch } from './store/setup/store';
import { getUserAsync } from './store/user/userSlice';
import { getRoomAsync } from './store/room/roomSlice';
import Home from './pages/home/Home';
import { getQuestionsAsync } from './store/questions/questionsSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem('userId', '60c751315d4513378053af08');
    dispatch(getUserAsync());
    dispatch(getRoomAsync());
    dispatch(getQuestionsAsync());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
