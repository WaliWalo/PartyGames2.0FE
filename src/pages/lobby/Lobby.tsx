import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import gsap from 'gsap/all';

function Lobby() {
  const useStyles = makeStyles({
    container: {
      backgroundColor: 'blue',
      height: '100vh',
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column',
    },
    namesContainer: {
      height: '100%',
      backgroundColor: 'pink',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: { backgroundColor: 'blue', height: '10em', width: '10em' },
    collide: { backgroundColor: 'black', height: '10em', width: '10em' },
    movingContainer: {
      backgroundColor: 'black',
      height: '2em',
      width: '1em',
      position: 'absolute',
    },
    inputTest: {
      opacity: 0,
      position: 'absolute',
      bottom: '0',
      zIndex: 0,
    },
  });

  const classes = useStyles();
  const nameDiv = useRef<HTMLDivElement>(null);
  const containerOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Space') {
      gsap.to(`.${classes.movingContainer}`, {
        y: -window.innerHeight,
        duration: 3,
        onUpdate: function () {
          isOverlap(this._targets[0], nameDiv.current);
        },
        onComplete: () => {
          gsap.to(`.${classes.movingContainer}`, {
            y: 0,
            duration: 3,
            ease: 'power.in',
            onUpdate: function () {
              isOverlap(this._targets[0], nameDiv.current);
            },
          });
        },
      });
    }
  };

  function isOverlap(a: HTMLDivElement, b: HTMLDivElement | null) {
    if (b !== null) {
      let movingDiv = a.getBoundingClientRect();
      let target = b.getBoundingClientRect();

      if (
        movingDiv.left < target.left + target.width &&
        movingDiv.left + movingDiv.width > target.left &&
        movingDiv.top < target.top + target.height &&
        movingDiv.top + movingDiv.height > target.top
      ) {
        // b.classList.add(classes.collide);
        gsap.to(`.${classes.name}`, {
          duration: 1,
          backgroundColor: 'black',
          onComplete: () => {
            gsap.to(`.${classes.name}`, {
              duration: 1,
              backgroundColor: 'blue',
            });
          },
        });
      }
    }
  }

  useEffect(() => {
    gsap.to(`.${classes.movingContainer}`, {
      right: '0',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power.in',
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.namesContainer}>
        <div className={classes.name} ref={nameDiv}>
          test
        </div>
      </div>
      <div className={classes.movingContainer}>
        <input
          autoFocus
          className={classes.inputTest}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
            containerOnKeyPress(e)
          }
          value=""
          onBlur={(e) => e.currentTarget.focus()}
        ></input>
      </div>
    </div>
  );
}

export default Lobby;
