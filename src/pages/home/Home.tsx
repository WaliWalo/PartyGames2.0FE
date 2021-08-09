import React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
  useMediaQuery,
  InputLabel,
  Select,
} from '@material-ui/core';
import './home.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';

function Home() {
  const matches = useMediaQuery('(max-width: 426px)');
  const [game, setGame] = React.useState('Truth or Dare');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGame(event.target.value as string);
  };
  return (
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
            <Button variant="outlined" color="primary">
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
            <Button variant="outlined" color="primary">
              {matches ? <AddBoxIcon fontSize="large" /> : 'Create Room'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
