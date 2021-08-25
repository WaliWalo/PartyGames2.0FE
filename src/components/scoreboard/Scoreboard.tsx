import React from 'react';
import './scoreboard.css';
import { IScoreboardProps } from './types';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'typeface-fredoka-one';
import 'typeface-bangers';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#FEF445',
      color: 'black',
      fontFamily: 'Bangers',
      fontSize: '2vw',
      '@media (max-width:769px)': {
        fontSize: '1.5rem',
      },
    },
    body: {
      fontSize: '1.5vw',
      fontFamily: 'Fredoka One',
      wordBreak: 'break-word',
      '@media (max-width:769px)': {
        fontSize: '1rem',
      },
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:hover': {
        backgroundColor: 'rgb(0,0,0,20%)',
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  scoreboardContainer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
  },
  container: {
    maxHeight: 240,
  },
  table: {
    minWidth: 250,
  },
});

function Scoreboard(props: IScoreboardProps) {
  const classes = useStyles();

  return (
    <div className={classes.scoreboardContainer}>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="left">Answer</StyledTableCell>
              <StyledTableCell align="left">Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.answer}</StyledTableCell>
                <StyledTableCell align="left">{row.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Scoreboard;
