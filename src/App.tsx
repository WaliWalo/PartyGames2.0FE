import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/setup/store';
import { getUserAsync } from './store/user/userSlice';
import { getRoomAsync } from './store/room/roomSlice';

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem('userId', '60c751315d4513378053af08');
    dispatch(getUserAsync());
    dispatch(getRoomAsync());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {user.enteredGame && user.enteredGame.toString()}
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
