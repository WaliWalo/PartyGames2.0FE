import React, { useEffect } from 'react';
import './messages.css';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SendIcon from '@material-ui/icons/Send';
import MessageBubble from './MessageBubble';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { useAppDispatch, useAppSelector } from '../../store/setup/store';
import { getMessagesAsync } from './../../store/messages/messagesSlice';
import { IMessage } from './../../store/messages/types';
import 'typeface-fredoka-one';

function Messages() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
      notificationMsg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
        fontFamily: 'Fredoka One',
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
    })
  );

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const roomState = useAppSelector((state) => state.room);
  const messagesState = useAppSelector((state) => state.messages);
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMessagesAsync(roomState.room?._id));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="messageContainer">
      <div className="contentContainer">
        {messagesState.messages?.length !== 0 &&
          messagesState.messages?.map((message: IMessage) => {
            const sender =
              userState.user?._id === message.sender._id ? true : false;
            return message._id === 'notification' ? (
              <div className={classes.notificationMsg}>
                <p>{message.content}</p>
              </div>
            ) : (
              <MessageBubble message={message.content} sender={sender} />
            );
          })}
        <MessageBubble message="test" sender={false} />
        <MessageBubble message="test" sender={true} />
      </div>
      <div className="inputsContainer">
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Enter message here"
            inputProps={{ 'aria-label': 'Enter message here' }}
          />
          <IconButton className={classes.iconButton} aria-label="media">
            <PhotoLibraryIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="send"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}

export default Messages;
