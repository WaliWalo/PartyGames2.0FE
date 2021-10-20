import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { IRouletteProps } from './types';
import NavigationIcon from '@material-ui/icons/Navigation';
import SingleUser from './SingleUser';
import { useAppDispatch, useAppSelector } from './../../store/setup/store';
import gsap from 'gsap/all';
import { setRoom } from '../../store/room/roomSlice';
import { IRoom } from '../../store/room/types';

function Roulette(props: IRouletteProps) {
  const matches = useMediaQuery('(max-width: 426px)');
  const tableMatch = useMediaQuery('(max-width:738px and min-width:426px)');
  const rouletteDimension = matches ? '15em' : tableMatch ? '40em' : '25vw';
  const useStyles = makeStyles({
    rouletteContainer: {
      height: rouletteDimension,
      width: rouletteDimension,
      position: 'relative',
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
      top: '-1em',
      zIndex: 50,
      transform: 'translateX(-50%)',
      left: '50%',
      '&>svg': { transform: 'rotate(180deg)' },
    },
    spinBtnContainer: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'center',
    },
  });

  const classes = useStyles();
  const userState = useAppSelector((state) => state.user);
  const roomState = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();

  const spinWheel = () => {
    console.log('test');
    const chosenIndex = 1;
    const position = ((360 / props.users.length) * chosenIndex) / 2;
    const rotate = position + 360 * 5;
    gsap.to(`.${classes.rouletteInnerContainer}`, {
      duration: 3,
      rotate: `+=${rotate}`,
      onComplete: () => {
        const newUsers = [roomState.room.users[1], roomState.room.users[0]];
        const newRoom: IRoom = {
          ...roomState.room,
          users: newUsers,
        };
        dispatch(setRoom(newRoom));
      },
    });
  };

  return (
    <div className={classes.rouletteContainer}>
      <div className={classes.arrow}>
        <NavigationIcon fontSize="large" />
      </div>
      <div className={classes.rouletteInnerContainer}>
        {props.users.length > 0 &&
          props.users.map((user, index) => {
            const degree = (360 / props.users.length) * index;
            return <SingleUser degree={degree} name={user} />;
          })}
      </div>
      {userState.user?.turn && (
        <div className={classes.spinBtnContainer} onClick={() => spinWheel()}>
          <button className="pushable">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">SPIN</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Roulette;
