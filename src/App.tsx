import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAppDispatch } from './store/setup/store';
import { getUserAsync } from './store/user/userSlice';
import { getRoomAsync } from './store/room/roomSlice';
import Home from './pages/home/Home';
import { getQuestionsAsync } from './store/questions/questionsSlice';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Lobby from './pages/lobby/Lobby';
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
      <Router>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/lobby/:roomId" exact>
          <Lobby />
        </Route>
      </Router>
    </div>
  );
}

export default App;
