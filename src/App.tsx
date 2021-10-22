import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/setup/store';
import { getUserAsync } from './store/user/userSlice';
import { getRoomAsync, setRoom } from './store/room/roomSlice';
import Home from './pages/home/Home';
import { getQuestionsAsync } from './store/questions/questionsSlice';
import { Route, useHistory } from 'react-router-dom';
import Lobby from './pages/lobby/Lobby';
import socket from './utilities/socketApi';
import { ISocketIdType } from './utilities/types';
import { IJoinRoomSocket } from './pages/home/types';
import Tod from './pages/tod/Tod';

function App() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const roomState = useAppSelector((state) => state.room);
  const history = useHistory();

  useEffect(() => {
    socket.on('joinRoom', (data: IJoinRoomSocket) => {
      if (data.status === 'ok') {
        data.userId !== undefined &&
          localStorage.setItem('userId', data.userId);

        dispatch(getUserAsync());
        dispatch(getRoomAsync());
      } else {
        alert('room does not exist');
      }
    });
    return function disconnect() {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    userState.status === 'ok' &&
      socket.emit('userConnected', { userId: userState.user?._id });

    socket.on('connect', () => {
      dispatch(getUserAsync());
      dispatch(getRoomAsync());
      dispatch(getQuestionsAsync());
    });
    // once user creates room this will happen
    userState.socketId !== undefined &&
      socket.on(userState.socketId, (data: ISocketIdType) => {
        if (data.status === 'ok') {
          dispatch(setRoom(data.data));
          localStorage.setItem('userId', data.data.users[0]._id);
          dispatch(getUserAsync());
        }
      });

    roomState.room &&
      socket.on(roomState.room?.roomName, (data: ISocketIdType) => {
        if (data?.status === 'end') {
          localStorage.removeItem('userId');
          history.push(`/`);
        }
      });

    socket.on('startGame', () => dispatch(getRoomAsync()));

    roomState?.room?.started
      ? history.push(`/tod/${roomState.room?._id}`)
      : history.push(`/lobby/${roomState.room?._id}`);

    !roomState.inRoom && history.push(`/`);
    // eslint-disable-next-line
  }, [userState, roomState]);

  return (
    <div className="appContainer">
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/lobby/:roomId" exact>
        <Lobby />
      </Route>
      <Route path="/tod/:roomId" exact>
        <Tod />
      </Route>
    </div>
  );
}

export default App;
