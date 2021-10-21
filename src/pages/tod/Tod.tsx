import React, { useState } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from './../../store/setup/store';
import 'typeface-fredoka-one';
import 'typeface-bangers';
import ActionButtons from './../../components/buttons/ActionButtons';
import socket from './../../utilities/socketApi';
import { unsetRoom } from '../../store/room/roomSlice';
import { unsetUser } from '../../store/user/userSlice';
import Messages from './../../components/messages/Messages';
import PlayersModal from './../../components/modals/PlayersModal';
import gsap from 'gsap/all';
import Roulette2 from './../../components/roulette/Roulette2';
function Tod() {
  const matches = useMediaQuery('(max-width: 426px)');
  const tableMatch = useMediaQuery('(max-width:738px and min-width:426px)');

  const useStyles = makeStyles({
    messageContainer: {
      width: matches ? '0' : '40%',
      position: 'absolute',
      right: 0,
      height: matches ? '0' : '100vh',
      bottom: 0,
      visibility: matches ? 'hidden' : 'visible',
    },
    todContainer: {
      backgroundColor: 'pink',
      height: '100vh',
      width: matches ? '100%' : '60%',
      overflow: 'hidden',
    },
    actionButtonsContainer: {
      position: 'absolute',
      right: '40%',
      top: 0,
      display: 'flex',
    },
    roomNameContainer: {
      height: matches ? '15%' : '30%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Bangers',
      fontSize: matches ? '5em' : '9vw',
    },
    wheelContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: tableMatch ? '58%' : '70%',
      padding: '2vh 0 2vh 0',
    },
    mobileActionContainer: {
      height: matches ? '15%' : '0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& div': { display: 'flex' },
    },
    mobileMessageContainer: {},
  });

  const classes = useStyles();
  const roomState = useAppSelector((state) => state.room);
  const userState = useAppSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleLeaveGame = () => {
    socket.emit(userState.user?.creator ? 'endGame' : 'leaveRoom', {
      userId: userState.user._id,
      roomName: roomState.room.roomName,
    });
    dispatch(unsetRoom);
    dispatch(unsetUser);
  };

  const handleOpenMessage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    gsap.to(`.${classes.messageContainer}`, {
      autoAlpha: 1,
      duration: 1,
      borderRadius: '10% 10% 0 0',
      height: '50%',
      width: '100%',
    });
    gsap.to(`.${classes.mobileMessageContainer}`, { autoAlpha: 0 });
  };

  const handleCloseMessage = () => {
    if (matches) {
      gsap.to(`.${classes.messageContainer}`, {
        autoAlpha: 0,
        duration: 1,
        height: 0,
        width: 0,
      });
      gsap.to(`.${classes.mobileMessageContainer}`, { autoAlpha: 1 });
    }
  };

  return (
    <>
      <div
        className={classes.todContainer}
        onClick={() => handleCloseMessage()}
      >
        {!matches && (
          <div className={classes.actionButtonsContainer}>
            {userState.user?.creator && roomState.room?.users.length > 1 && (
              <div onClick={() => setOpenModal(true)}>
                <ActionButtons buttonType="kickPlayer" />
              </div>
            )}

            <div onClick={() => handleLeaveGame()}>
              <ActionButtons buttonType="leaveGame" />
            </div>
          </div>
        )}
        <div className={classes.roomNameContainer}>
          <span>{roomState.inRoom ? roomState.room.roomName : 'ROOMID'}</span>
        </div>
        <div className={classes.wheelContainer}>
          <Roulette2 />
        </div>
        {matches && (
          <div className={classes.mobileActionContainer}>
            <div>
              <ActionButtons buttonType="kickPlayer" />
              <ActionButtons buttonType="leaveGame" />
            </div>
            <div
              className={classes.mobileMessageContainer}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                handleOpenMessage(e)
              }
            >
              <ActionButtons buttonType="message" />
            </div>
          </div>
        )}
      </div>
      <div
        className={classes.messageContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <Messages />
      </div>
      <PlayersModal
        handleClose={() => setOpenModal(false)}
        openModal={openModal}
      />
    </>
  );
}

export default Tod;
