import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { IRouletteProps } from './types';
import NavigationIcon from '@material-ui/icons/Navigation';
import SingleUser from './SingleUser';

function Roulette(props: IRouletteProps) {
  const matches = useMediaQuery('(max-width: 426px)');
  const tableMatch = useMediaQuery('(max-width:738px and min-width:426px)');
  const rouletteDimension = matches ? '15em' : tableMatch ? '40em' : '30vw';
  const useStyles = makeStyles({
    rouletteContainer: {
      height: rouletteDimension,
      width: rouletteDimension,
      // position: 'absolute',
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
      zIndex: 50,
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.rouletteContainer}>
      <div className={classes.rouletteInnerContainer}>
        <div className={classes.arrow}>
          <NavigationIcon fontSize="large" />
        </div>
        {props.users.length > 0 &&
          props.users.map((user, index) => {
            const degree = (360 / props.users.length) * index;
            return <SingleUser degree={degree} name={user} />;
          })}
      </div>
    </div>
  );
}

export default Roulette;
