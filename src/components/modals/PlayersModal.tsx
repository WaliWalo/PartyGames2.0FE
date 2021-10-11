import {
  Backdrop,
  createStyles,
  Fade,
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
        borderRadius: '90px',
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
  const names = roomState.inRoom
    ? roomState.room.users.map((user: IUser) => user.name)
    : [];

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
              {names.map((name: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
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
