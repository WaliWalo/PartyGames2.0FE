import { IconButton } from '@material-ui/core';
import React from 'react';
import { IActionButtonsProps } from './types';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import './actionBtn.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SmsIcon from '@material-ui/icons/Sms';

function ActionButtons(props: IActionButtonsProps) {
  return (
    <div className="actionBtnContainer">
      <IconButton aria-label="delete" id="actionBtn">
        {props.buttonType === 'kickPlayer' ? (
          <PersonAddDisabledIcon id="actionIcon" />
        ) : props.buttonType === 'leaveGame' ? (
          <ExitToAppIcon id="actionIcon" />
        ) : props.buttonType === 'scoreBoard' ? (
          <AssignmentIcon id="actionIcon" />
        ) : (
          <SmsIcon id="actionIcon" />
        )}
      </IconButton>
    </div>
  );
}

export default ActionButtons;
