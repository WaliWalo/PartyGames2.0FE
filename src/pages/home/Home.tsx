import React, { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  useMediaQuery,
  InputLabel,
  Select,
} from '@material-ui/core';
import './home.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import gsap from 'gsap';
import HomeLoader from './../loader/HomeLoader';
import socket from './../../utilities/socketApi';
import { useAppSelector } from './../../store/setup/store';

function Home() {
  const matches = useMediaQuery('(max-width: 426px)');
  const [game, setGame] = useState('Truth or Dare');
  const [createUser, setCreateUser] = useState('');
  const [joinUser, setJoinUser] = useState('');
  const [roomName, setRoomName] = useState('');
  const roomState = useAppSelector((state) => state.room);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGame(event.target.value as string);
  };

  useEffect(() => {
    gsap.to('#party', {
      x: '130%',
      duration: 1.5,
      ease: 'bounce.out',
      onComplete: () => {
        gsap.to('#games', {
          x: '150%',
          duration: 1.5,
          ease: 'bounce.out',
          onComplete: () => {
            gsap.to('#homeLoader', {
              opacity: 0,
              display: 'none',
              duration: 1,
            });
          },
        });
      },
    });
  }, [matches, roomState]);

  const createRoomSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('createRoom', { userName: createUser, roomType: game });
  };

  const joinRoomSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('joinRoom', {
      userName: joinUser,
      roomName: roomName.toUpperCase(),
    });
  };

  return (
    <>
      <HomeLoader />
      <video playsInline autoPlay muted loop id="bgvid">
        <source
          src="https://res.cloudinary.com/waliwalo/video/upload/v1617028507/solocap/Abstract_animation_pipelines_back_ground_kqhszo.mp4"
          type="video/mp4"
        />
      </video>
      <div id="homeBg">
        <div className="App">
          <div className="header">
            <h1>PARTY GAMES</h1>
          </div>
          <div className="home-form">
            <div className="join-room">
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => joinRoomSubmit(e)}
              >
                <div className="create-fields">
                  <TextField
                    id="filled-basic-username"
                    label="Username"
                    variant="filled"
                    size="medium"
                    required
                    value={joinUser}
                    onChange={(e) => setJoinUser(e.currentTarget.value)}
                  />
                  <TextField
                    id="filled-basic-room-name"
                    label="Room Id"
                    variant="filled"
                    size="medium"
                    required
                    value={roomName}
                    onChange={(e) => setRoomName(e.currentTarget.value)}
                  />
                </div>
                <Button variant="contained" color="primary" type="submit">
                  {matches ? <ExitToAppIcon fontSize="large" /> : 'Join Room'}
                </Button>
              </form>
            </div>
            <hr />
            <div className="create-room">
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) =>
                  createRoomSubmit(e)
                }
              >
                <div className="create-fields">
                  <TextField
                    id="filled-basic-username"
                    label="Username"
                    variant="filled"
                    size="medium"
                    required
                    value={createUser}
                    onChange={(e) => setCreateUser(e.currentTarget.value)}
                  />
                  <FormControl required>
                    <InputLabel id="select-helper-label">Game type</InputLabel>
                    <Select
                      labelId="select-required-label"
                      id="select-required"
                      value={game}
                      onChange={handleChange}
                      autoWidth
                    >
                      <MenuItem value={'Truth or Dare'}>Truth or Dare</MenuItem>
                      <MenuItem value={'Would You Rather'}>
                        Would You Rather
                      </MenuItem>
                      <MenuItem value={'Bingo'}>Bingo</MenuItem>
                      <MenuItem value={'Charades'}>Charades</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button variant="contained" color="primary" type="submit">
                  {matches ? <AddBoxIcon fontSize="large" /> : 'Create Room'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <BingoBoard /> */}
      {/* <Bar height={50} /> */}

      {/* <Scoreboard
        users={[
          {
            _id: 'string',
            score: 10,
            name: 'afdsafdasfasfdsfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            creator: true,
            turn: true,
            createdAt: new Date('1995-12-17T03:24:00'),
            updatedAt: new Date('1995-12-17T03:24:00'),
            answer: 'afdsafdasfasfdsfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          },
        ]}
      /> */}
    </>
  );
}

export default Home;
