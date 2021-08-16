import {
  Modal,
  Backdrop,
  makeStyles,
  createStyles,
  useMediaQuery,
  Theme,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Fade } from 'react-bootstrap';
import { IModalProps } from './types';
import './modals.css';
import { Autocomplete } from '@material-ui/lab';
import { useAppSelector } from './../../store/setup/store';
import { IQuestion } from './../../store/questions/types';
function QuestionsModal(props: IModalProps) {
  const matches = useMediaQuery('(max-width: 426px)');

  const modalFlexDirection = matches ? 'column' : 'row';
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
        flexDirection: modalFlexDirection,
      },
    })
  );

  const classes = useStyles();
  const questions = useAppSelector((state) => state.questions.questions);

  const [selectedQuestion, setSelectedQuestion] = useState('');
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
            {/* <h1 className="todTitle">{props.tod}</h1> */}
            <Autocomplete
              id="combo-box-demo"
              options={
                questions !== undefined &&
                questions
                  .filter(
                    (question: IQuestion) => question.questionType === props.tod
                  )
                  .sort(() => Math.random() - 0.5)
              }
              getOptionLabel={(option: IQuestion) => option.content}
              inputValue={selectedQuestion}
              onInputChange={(event, newInputValue) =>
                setSelectedQuestion(newInputValue)
              }
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.tod !== undefined && props.tod.toUpperCase()}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              )}
            />
            <Box ml={matches ? 0 : 3} mt={matches && 3}>
              <Button
                className="questionsBtn"
                variant="contained"
                color="primary"
                onClick={props.handleClose}
              >
                ENTER
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default QuestionsModal;
