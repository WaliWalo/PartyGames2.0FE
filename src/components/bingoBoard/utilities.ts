export function getBoard() {
  let allNumbers: Array<Number | String> = generateRandomNumbers();

  let rows: Array<Array<Number | String>> = [];
  let cols: Array<Array<Number | String>> = [];

  // loop 5 times to put them into 5 array with starting letter of BINGO

  for (let i = 0; i < 5; i++) {
    // depending on index put in the first alphabet to first index of array
    let alphabet =
      i === 0 ? 'B' : i === 1 ? 'I' : i === 2 ? 'N' : i === 3 ? 'G' : 'O';
    let row: Array<Number | String> = [alphabet];

    // add the first 5 numbers to first row which already has the first alphabet
    let newRow = row.concat(allNumbers.splice(0, 5));
    // add it into rows array
    // ["B", 12, 65, 4, 53, 44]
    // ["I", 2, 48, 9, 61, 37]
    // ["N", 49, 55, 72, 29, 52]
    // ["G", 33, 22, 69, 13, 32]
    // ["O", 54, 24, 25, 8, 36]
    rows = [...rows, newRow];

    // for each number/alphabet in a row push it into cols array
    // ["B", "I", "N", "G", "O"]
    // [12, 2, 49, 33, 54]
    // [65, 48, 55, 22, 24]
    // [4, 9, 72, 69, 25]
    // [53, 61, 29, 13, 8]
    // [44, 37, 52, 32, 36]
    newRow.forEach((row, index) => {
      cols.length < 6 ? cols.push([row]) : cols[index].push(row);
    });
  }

  // add alphabet infront of the arr
  // ["B", "I", "N", "G", "O"]
  // ["B", 12, 2, 49, 33, 54]
  // ["I", 65, 48, 55, 22, 24]
  // ["N", 4, 9, 72, 69, 25]
  // ["G", 53, 61, 29, 13, 8]
  // ["O", 44, 37, 52, 32, 36]
  for (let i = 1; i < 6; i++) {
    cols[i].unshift(cols[0][i - 1]);
  }

  // remove the first arr ["B", "I", "N", "G", "O"]
  cols.shift();

  return { rows, cols };
}

const generateRandomNumbers = () => {
  let allNumbers: Array<Number | String> = [];
  // generate 25 random rumbers starting from 1-75 with no repeat
  while (allNumbers.length < 25) {
    const random = Math.floor(Math.random() * 75);
    random > 0 && allNumbers.push(random);
    allNumbers = [...new Set(allNumbers)];
  }

  return allNumbers;
};

export const checkBingo = (selectedNumber: number) => {};
