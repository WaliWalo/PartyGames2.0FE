import {
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Modal,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import { IModalProps } from './types';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAppSelector } from './../../store/setup/store';
import { IUser } from './../../store/user/types';
import './modals.css';
import socket from './../../utilities/socketApi';

function PlayersModal(props: IModalProps) {
  const matches = useMediaQuery('(max-width: 426px)');

  const modalPadding = matches ? '2em' : '2em';
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
        borderRadius: '5px',
        display: 'flex',
      },
      listContainer: {
        width: '100%',
        '&>ul': {
          width: '20em',
        },
      },
    })
  );

  const classes = useStyles();
  const roomState = useAppSelector((state) => state.room);
  const handleKick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    socket.emit('leaveRoom', {
      userId: e.currentTarget.id.slice(6),
      roomName: roomState.room.roomName,
    });
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.openModal}
        onClose={props.handleClose}
      >
        <div className={classes.paper}>
          <div className={classes.listContainer}>
            <List>
              {roomState.inRoom &&
                roomState.room.users
                  .filter((user: IUser) => !user.creator)
                  .map((user: IUser, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={user.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          id={`delBtn${user._id}`}
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                          ) => handleKick(e)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
            </List>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PlayersModal;
