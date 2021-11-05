import React, { FormEvent, useEffect, useRef, useState } from 'react';
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
import {
  getMessagesAsync,
  setMessages,
} from './../../store/messages/messagesSlice';
import { IMessage } from './../../store/messages/types';
import 'typeface-fredoka-one';
import socket from '../../utilities/socketApi';

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
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  messagesState.messages !== undefined &&
    socket.on('sendMessage', (message: IMessage) => {
      dispatch(setMessages([...messagesState.messages, message]));
    });

  useEffect(() => {
    roomState.inRoom && dispatch(getMessagesAsync(roomState.room?._id));

    return () => {
      socket.off('sendMessage');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

  const handleSendMsg = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    socket.emit('sendMessage', {
      sender: userState.user?._id,
      content: input,
      roomName: roomState.room?.roomName,
    });
    setInput('');
  };

  return (
    <div className="messageContainer">
      <div className="contentContainer">
        {messagesState.messages?.length !== 0 &&
          messagesState.messages?.map((message: IMessage, index: number) => {
            const sender =
              userState.user?._id === message.sender?._id ? true : false;
            return message._id === 'notification' ? (
              <div className={classes.notificationMsg} key={index}>
                <p>{message.content}</p>
              </div>
            ) : (
              <MessageBubble
                key={index}
                message={message.content}
                sender={sender}
                senderName={
                  message.sender === null ? 'user left' : message.sender?.name
                }
              />
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <div className="inputsContainer">
        <Paper
          component="form"
          className={classes.root}
          onSubmit={(e: FormEvent<HTMLDivElement>) => handleSendMsg(e)}
        >
          <InputBase
            className={classes.input}
            placeholder="Enter message here"
            inputProps={{ 'aria-label': 'Enter message here' }}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <IconButton className={classes.iconButton} aria-label="media">
            <PhotoLibraryIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="send"
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}

export default Messages;
