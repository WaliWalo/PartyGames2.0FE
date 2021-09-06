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
} from '@material-ui/core';

function BingoBoard() {
  const useStyles = makeStyles({
    bingoContainer: {
      position: 'absolute',
      height: '40em',
      width: '40em',
      backgroundColor: 'black',
      right: '35%',
      top: '10%',
    },
    table: {
      minWidth: 550,
    },
  });

  const classes = useStyles();

  const [numbers, setNumbers] = useState<Array<Array<Number | String>>>([]);

  useEffect(() => {
    let allNumbers: Array<Number | String> = [];

    while (allNumbers.length < 25) {
      allNumbers.push(Math.floor(Math.random() * 75));
      allNumbers = [...new Set(allNumbers)];
    }
    console.log(allNumbers);
    let rows: Array<Array<Number | String>> = [];
    for (let i = 0; i < 5; i++) {
      let alphabet =
        i === 0 ? 'B' : i === 1 ? 'I' : i === 2 ? 'N' : i === 3 ? 'G' : 'O';
      let row: Array<Number | String> = [alphabet];
      let newRow = row.concat(allNumbers.splice(0, 5));
      rows = [...rows, newRow];
    }

    setNumbers(rows);
    // while (allNumbers.length !== 10) {
    //   const row = allNumbers.splice(0, 10);
    //   setNumbers([...numbers, row]);
    // }
  }, []);

  return (
    <div className={classes.bingoContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>B</TableCell>
              <TableCell>I</TableCell>
              <TableCell>N</TableCell>
              <TableCell>G</TableCell>
              <TableCell>O</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numbers.map((number, index) => (
              <TableRow>
                {number.map((number) => (
                  <TableCell>{number}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BingoBoard;
