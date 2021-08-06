import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/setup/store';
import { getUserAsync } from './store/user/userSlice';
import { getRoomAsync } from './store/room/roomSlice';
import Home from './pages/home/Home';

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem('userId', '60c751315d4513378053af08');
    dispatch(getUserAsync());
    dispatch(getRoomAsync());
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
