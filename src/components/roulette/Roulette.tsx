import React from 'react';
import { makeStyles } from '@material-ui/core';
import { IRouletteProps } from './types';
import NavigationIcon from '@material-ui/icons/Navigation';
import SingleUser from './SingleUser';

const useStyles = makeStyles({
  rouletteContainer: {
    backgroundColor: 'black',
    height: '30vw',
    width: '30vw',
    position: 'absolute',
    right: '38%',
    top: '30%',
  },
  rouletteInnerContainer: {
    height: '100%',
    width: '100%',
    borderRadius: '100%',
    backgroundColor: 'red',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  arrow: {
    position: 'absolute',
    transform: 'rotate(180deg)',
    top: '-1em',
  },
});

function Roulette(props: IRouletteProps) {
  const classes = useStyles();

  return (
    <div className={classes.rouletteContainer}>
      <div className={classes.rouletteInnerContainer}>
        <div className={classes.arrow}>
          <NavigationIcon fontSize="large" />
        </div>
        <SingleUser numOfUsers={props.users.length} />
      </div>
    </div>
  );
}

export default Roulette;
