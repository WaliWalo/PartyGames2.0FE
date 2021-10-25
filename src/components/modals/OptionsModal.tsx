import {
  Backdrop,
  Box,
  Button,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import { IModalProps } from './types';
import './modals.css';
import socket from '../../utilities/socketApi';
import { useAppSelector } from '../../store/setup/store';

function OptionsModal(props: IModalProps) {
  const matches = useMediaQuery('(max-width: 426px)');

  const modalFlexDirection = matches ? 'column' : 'row';
  const modalPadding = matches ? '2em' : '5em';
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.info.light,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: modalPadding,
        borderRadius: '90px',
        display: 'flex',
        flexDirection: modalFlexDirection,
      },
    })
  );

  const classes = useStyles();
  const roomState = useAppSelector((state) => state.room);
  const userState = useAppSelector((state) => state.user);

  const handleSelectedOption = (option: String) => {
    socket.emit('input', {
      userId: userState.user?._id,
      roomName: roomState.room?.roomName,
      type: props.type,
      value: option,
    });
    props.handleClose();
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            <Button
              className="optionsBtn"
              variant="contained"
              color="primary"
              onClick={() =>
                handleSelectedOption(
                  props.options !== undefined ? props.options[0] : ''
                )
              }
            >
              {props.options !== undefined && props.options[0]}
            </Button>
            <Box
              m={matches ? 0 : 5}
              my={matches ? 1 : 0}
              className="optionOrContainer"
            >
              <h2 className="optionOr">OR</h2>
            </Box>
            <Button
              className="optionsBtn"
              variant="contained"
              color="secondary"
              onClick={() =>
                handleSelectedOption(
                  props.options !== undefined ? props.options[1] : ''
                )
              }
            >
              {props.options !== undefined && props.options[1]}
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default OptionsModal;
