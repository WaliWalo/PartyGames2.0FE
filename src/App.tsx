import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/setup/store';
import { getUserAsync, setUser } from './store/user/userSlice';
import { getRoomAsync, setRoom } from './store/room/roomSlice';
import Home from './pages/home/Home';
import { getQuestionsAsync } from './store/questions/questionsSlice';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Lobby from './pages/lobby/Lobby';
import socket from './utilities/socketApi';
import { ISocketIdType } from './utilities/types';
function App() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const roomState = useAppSelector((state) => state.room);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getRoomAsync());
    dispatch(getQuestionsAsync());
    socket.emit('userConnected', { userId: userState.user?._id });

    return function disconnect() {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      dispatch(
        setUser({
          ...userState.user,
          socketId: socket.id,
        })
      );
    });

    userState.user?.socketId !== undefined &&
      socket.on(userState.user?.socketId, (data: ISocketIdType) => {
        if (data.status === 'ok') {
          dispatch(setRoom(data.data));
          localStorage.setItem('userId', data.data.users[0]);
          dispatch(getUserAsync());
        }
      });
    roomState.inRoom && history.push(`/lobby/${roomState.room._id}`);

    // eslint-disable-next-line
  }, [userState, roomState]);

  return (
    <div>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/lobby/:roomId" exact>
        <Lobby />
      </Route>
    </div>
  );
}

export default App;
