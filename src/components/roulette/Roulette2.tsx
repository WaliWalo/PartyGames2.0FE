import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useAppSelector } from '../../store/setup/store';
import { IUser } from '../../store/user/types';
import { makeStyles } from '@material-ui/core/styles';
import socket from './../../utilities/socketApi';

function Roulette2() {
  const useStyles = makeStyles({
    spinBtnContainer: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'center',
    },
  });

  const classes = useStyles();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const roomState = useAppSelector((state) => state.room);
  const userState = useAppSelector((state) => state.user);

  const users = roomState.inRoom
    ? roomState.room.users.map((user: IUser) => {
        return { option: user.name };
      })
    : [];

  useEffect(() => {
    roomState.status === 'ok' &&
      socket.once('randomUser', (selectedUser: IUser) => {
        const selectedUserIndex = roomState.room?.users.findIndex(
          (user: IUser) => user._id === selectedUser._id
        );
        console.log(selectedUserIndex);
        setPrizeNumber(selectedUserIndex);
        setMustSpin(true);
      });
  });

  const handleSpinClick = () => {
    socket.emit('randomUser', {
      userId: userState.user?._id,
      roomName: roomState.room?.roomName,
    });
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={users}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        backgroundColors={['#f72585', '#3a0ca3']}
        perpendicularText={true}
        fontSize={40}
      />
      {userState.user?.turn && (
        <div className={classes.spinBtnContainer} onClick={handleSpinClick}>
          <button className="pushable">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front">SPIN</span>
          </button>
        </div>
      )}
    </>
  );
}

export default Roulette2;
