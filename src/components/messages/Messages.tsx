import { Button, TextField } from '@material-ui/core';
import React from 'react';
import './messages.css';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SendIcon from '@material-ui/icons/Send';
import MessageBubble from './MessageBubble';

function Messages() {
  return (
    <div className="messageContainer">
      <div className="contentContainer">
        <MessageBubble message="test" sender={false} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
        <MessageBubble message="test" sender={true} />
      </div>
      <div className="inputsContainer">
        <div className="textContainer">
          <TextField id="messageInput" label="Enter Text" variant="filled" />
        </div>
        <div className="imageInputContainer">
          <Button variant="contained">
            <PhotoLibraryIcon />
          </Button>
        </div>
        <div className="enterInputContainer">
          <Button variant="contained" color="primary">
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
