import React, { useEffect, useRef, useState } from 'react';
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
      backgroundColor: '#FBFF12 !important',
      fontSize: '1.5vw',
      fontFamily: 'Fredoka One',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: 'rgb(251,255,18,20%)',
        cursor: 'pointer',
      },
    },
    bingo: {
      backgroundColor: '#04e762 !important',
      fontSize: '1.5vw',
      fontFamily: 'Bangers',
      textAlign: 'center',
    },
  });

  const classes = useStyles();
  const header = useRef<HTMLTableRowElement>(null);
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
    colNumbers.forEach((col, index) => {
      if (col.length === 1) {
        if (header.current !== null) {
          header.current.children[index + 1].classList.add(classes.bingo);
        }
      }
    });
    // eslint-disable-next-line
  }, [colNumbers]);

  const onClickNumber = (e: React.MouseEvent<HTMLElement>) => {
    if (!isNaN(parseInt(e.currentTarget.innerText))) {
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

      let cols = colNumbers.slice();
      cols.forEach((col, index) => {
        const newCol = col.filter(
          (colNumber) => colNumber !== parseInt(e.currentTarget.innerText)
        );
        cols[index] = newCol;
      });
      setColNumbers(cols);
    }
  };

  return (
    <div className={classes.bingoContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow ref={header}>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>B</StyledTableCell>
              <StyledTableCell>I</StyledTableCell>
              <StyledTableCell>N</StyledTableCell>
              <StyledTableCell>G</StyledTableCell>
              <StyledTableCell>O</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {displayBoard.map((row, index) => (
              <StyledTableRow key={index}>
                {row.map((cell, index) => {
                  let bingo: boolean = false;
                  let alphabets: Array<String | Number> = [];
                  rowNumbers.forEach((row) => {
                    if (row.length === 1) {
                      bingo = true;
                      alphabets.push(row[0]);
                    }
                  });
                  return (
                    <StyledTableCell
                      id={`${cell}`}
                      key={index}
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        onClickNumber(e)
                      }
                      className={
                        bingo &&
                        typeof cell === 'string' &&
                        alphabets.includes(cell)
                          ? classes.bingo
                          : classes.table
                      }
                      // classes={{ body: classes.cellOnClick }}
                    >
                      {cell}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BingoBoard;
