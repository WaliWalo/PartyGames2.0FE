import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import gsap from 'gsap/all';

function Lobby() {
  const useStyles = makeStyles({
    container: { backgroundColor: 'blue', height: '100vh' },
    containerA: {
      backgroundColor: 'black',
      height: '10em',
      width: '10em',
      // position: 'absolute',
      // bottom: '0',
      // zIndex: 5,
    },
    inputTest: {
      opacity: 0,
      position: 'absolute',
      bottom: '0',
      zIndex: 0,
    },
  });

  const classes = useStyles();

  const clamper = gsap.utils.clamp(0, 500);
  let x = 0;
  const containerOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'ArrowRight') {
      x += 100;
      gsap.to(`.${classes.containerA}`, { x: clamper(x) });
    } else if (e.code === 'ArrowLeft') {
      x -= 100;
      gsap.to(`.${classes.containerA}`, { x: clamper(x) });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerA}>
        <input
          autoFocus
          className={classes.inputTest}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
            containerOnKeyPress(e)
          }
          onBlur={(e) => e.currentTarget.focus()}
        ></input>
      </div>
    </div>
  );
}

export default Lobby;
