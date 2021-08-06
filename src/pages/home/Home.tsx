import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './home.css';

function Home() {
  return (
    <div className="App">
      <div className="header">
        <h1>PARTY GAMES</h1>
      </div>
      <div className="home-form">
        <div className="join-room">
          <form>
            <TextField
              id="filled-basic"
              label="Join Room"
              variant="filled"
              size="medium"
            />
            <Button variant="outlined" color="primary">
              Join Room
            </Button>
          </form>
        </div>
        <div className="create-room"></div>
      </div>
    </div>
  );
}

export default Home;
