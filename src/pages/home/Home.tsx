import React, { useEffect, useState } from 'react';
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
// import QuestionsModal from './../../components/modals/QuestionsModal';
import Messages from './../../components/messages/Messages';

function Home() {
  const matches = useMediaQuery('(max-width: 426px)');
  const [game, setGame] = useState('Truth or Dare');
  // const [openModal, setOpenModal] = useState(false);

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
  }, [matches]);

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
              <form>
                <div className="create-fields">
                  <TextField
                    id="filled-basic-username"
                    label="Username"
                    variant="filled"
                    size="medium"
                    required
                  />
                  <TextField
                    id="filled-basic-room-name"
                    label="Room Id"
                    variant="filled"
                    size="medium"
                    required
                  />
                </div>
                <Button variant="contained" color="primary">
                  {matches ? <ExitToAppIcon fontSize="large" /> : 'Join Room'}
                </Button>
              </form>
            </div>
            <hr />
            <div className="create-room">
              <form>
                <div className="create-fields">
                  <TextField
                    id="filled-basic-username"
                    label="Username"
                    variant="filled"
                    size="medium"
                    required
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
                <Button variant="contained" color="primary">
                  {matches ? <AddBoxIcon fontSize="large" /> : 'Create Room'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Messages />
      {/* <QuestionsModal
        handleClose={() => setOpenModal(false)}
        openModal={openModal}
        tod={'truth'}
      /> */}
    </>
  );
}

export default Home;
