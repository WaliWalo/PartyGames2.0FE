import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import './messageBubble.css';
import { IMessageBubbleProps } from './types';

function MessageBubble(props: IMessageBubbleProps) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      bubbleSender: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      },
      bubbleReceive: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
      },
      usernameContainer: {
        marginLeft: '1.5em',
        fontSize: '1em',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      bubbleSenderContainer: {
        width: '50%',
        backgroundColor: 'blue',
        margin: '0 1em 1em 1em',
        borderRadius: '5em',
        padding: '0.5em',
      },
      bubbleReceiveContainer: {
        width: '50%',
        backgroundColor: 'green',
        margin: '0 1em 1em 1em',
        borderRadius: '5em',
        padding: '0.5em',
      },
      textMsg: {
        wordWrap: 'break-word',
      },
    })
  );

  const classes = useStyles();

  return (
    <div
      className={props.sender ? classes.bubbleSender : classes.bubbleReceive}
    >
      {!props.sender && (
        <div className={classes.usernameContainer}>
          <span>user</span>
        </div>
      )}

      <div
        className={
          props.sender
            ? classes.bubbleSenderContainer
            : classes.bubbleReceiveContainer
        }
      >
        <span className={classes.textMsg}>{props.message}</span>
      </div>
    </div>
  );
}

export default MessageBubble;
