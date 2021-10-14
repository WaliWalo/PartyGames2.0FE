import React from 'react';
import './messages.css';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SendIcon from '@material-ui/icons/Send';
import MessageBubble from './MessageBubble';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { useMediaQuery } from '@material-ui/core';

function Messages() {
  const matches = useMediaQuery('(max-width: 426px)');
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
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

  return (
    <div className="messageContainer">
      <div className="contentContainer">
        <MessageBubble message="test" sender={false} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={false} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={false} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={false} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
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
