import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useAppDispatch, useAppSelector } from '../../store/setup/store';
import { IUser } from '../../store/user/types';
import { makeStyles } from '@material-ui/core/styles';
import socket from './../../utilities/socketApi';
import QuestionsModal from './../modals/QuestionsModal';
import OptionsModal from '../modals/OptionsModal';
import { getUserAsync } from '../../store/user/userSlice';

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
  const [openQuestionsModal, setOpenQuestionsModal] = useState(false);
  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [todOption, setTodOption] = useState<'truth' | 'dare'>('truth');
  const dispatch = useAppDispatch();

  const users = roomState.inRoom
    ? roomState.room.users.map((user: IUser) => {
        return { option: user.name };
      })
    : [];

  useEffect(() => {
    if (roomState.status === 'ok' && userState.status === 'ok') {
      socket.on('randomUser', (selectedUser: IUser) => {
        const selectedUserIndex = roomState.room?.users.findIndex(
          (user: IUser) => user._id === selectedUser._id
        );
        setPrizeNumber(selectedUserIndex);
        setMustSpin(true);
        setTimeout(
          () =>
            selectedUser._id === userState.user._id
              ? setOpenOptionsModal(true)
              : console.log(selectedUser.name),
          // 12000
          1000
        );
      });

      socket.on('input', ({ value }) => {
        setTodOption(value);
        console.log(value);
        if (userState.user.turn) {
          setOpenQuestionsModal(true);
        }
      });

      socket.on('nextUser', (user: IUser) => {
        console.log(user);
        dispatch(getUserAsync());
      });
    }

    return () => {
      socket.off('randomUser');
      socket.off('input');
      socket.off('nextUser');
    };
  });

  useEffect(() => {
    if (!userState.user?.turn) {
      setOpenQuestionsModal(false);
    }
  }, [userState?.user?.turn]);

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
      <OptionsModal
        handleClose={() => setOpenOptionsModal(false)}
        openModal={openOptionsModal}
        options={['truth', 'dare']}
        type="normal"
      />

      <QuestionsModal
        handleClose={() => setOpenQuestionsModal(false)}
        openModal={openQuestionsModal}
        tod={todOption}
        type="normal"
      />
    </>
  );
}

export default Roulette2;
