import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  makeStyles,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { getBoard } from './utilities';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#ff206e',
      color: 'black',
      fontFamily: 'Bangers',
      fontSize: '2vw',
      textAlign: 'center',
      '@media (max-width:769px)': {
        fontSize: '1.5rem',
      },
    },
    body: {
      fontSize: '1.5vw',
      fontFamily: 'Fredoka One',
      wordBreak: 'break-word',
      textAlign: 'center',
      '@media (max-width:769px)': {
        fontSize: '1rem',
      },
      '&:first-child': {
        backgroundColor: '#ff206e',
        '&:hover': {
          backgroundColor: '#ff206e',
          cursor: 'default',
        },
      },
      '&:hover': {
        backgroundColor: 'rgb(0,0,0,20%)',
        cursor: 'pointer',
      },
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
)(TableRow);

function BingoBoard() {
  const useStyles = makeStyles({
    bingoContainer: {
      position: 'absolute',
      height: '30vw',
      width: '30vw',
      right: '35%',
      top: '10%',
    },
    table: {
      minWidth: '100%',
    },
    cellOnClick: {
      backgroundColor: '#FBFF12',
      fontSize: '1.5vw',
      fontFamily: 'Fredoka One',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: 'rgb(251,255,18,20%)',
        cursor: 'pointer',
      },
    },
  });

  const classes = useStyles();

  // for displaying the board
  const [displayBoard, setDisplayBoard] = useState<
    Array<Array<Number | String>>
  >([]);
  // for checking if row got bingo
  const [rowNumbers, setRowNumbers] = useState<Array<Array<Number | String>>>(
    []
  );
  // for checking if col got bingo
  const [colNumbers, setColNumbers] = useState<Array<Array<Number | String>>>(
    []
  );

  useEffect(() => {
    const board = getBoard();
    setDisplayBoard(board.rows);
    // set the rows array into state
    setRowNumbers(board.rows);
    // set the cols array into state
    setColNumbers(board.cols);
  }, []);

  useEffect(() => {
    console.log(rowNumbers);
  }, [rowNumbers]);

  const onClickNumber = (e: React.MouseEvent<HTMLElement>) => {
    !isNaN(parseInt(e.currentTarget.innerText)) &&
      e.currentTarget.setAttribute(
        'style',
        'background-color:#FBFF12;font-size: 1.5vw;fontFamily: Fredoka One;textAlign: center'
      );

    let rows = rowNumbers.slice();
    rows.forEach((row, index) => {
      const newRow = row.filter(
        (rowNumber) => rowNumber !== parseInt(e.currentTarget.innerText)
      );
      rows[index] = newRow;
    });
    setRowNumbers(rows);
  };

  return (
    <div className={classes.bingoContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>B</StyledTableCell>
              <StyledTableCell>I</StyledTableCell>
              <StyledTableCell>N</StyledTableCell>
              <StyledTableCell>G</StyledTableCell>
              <StyledTableCell>O</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {displayBoard.map((number, index) => (
              <StyledTableRow key={index}>
                {number.map((number, index) => (
                  <StyledTableCell
                    key={index}
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      onClickNumber(e)
                    }
                    // classes={{ body: classes.cellOnClick }}
                  >
                    {number}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BingoBoard;
