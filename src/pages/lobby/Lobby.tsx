import React, { MouseEventHandler, useEffect } from 'react';
import { Collapse, IconButton, makeStyles } from '@material-ui/core';
import gsap from 'gsap/all';
import 'typeface-fredoka-one';
import 'typeface-bangers';
import { Alert } from '@material-ui/lab';

function Lobby() {
  const nameBgColors = [
    '#ff0aba',
    '#00ffcc',
    '#0aa5ff',
    '#eff900',
    '#00fa00',
    '#ff0000',
    '#0540f1',
  ];
  const useStyles = makeStyles({
    container: {
      backgroundColor: 'pink',
      height: '100vh',
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column',
    },
    roomIdContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '30%',
      fontFamily: 'Bangers',
      fontSize: '8em',
    },
    namesContainer: {
      height: '70%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      height: 'fit-content',
      width: '3em',
      margin: '0 2em 2em 2em',
      borderRadius: '2em',
      textAlign: 'center',
      writingMode: 'vertical-lr',
      textOrientation: 'upright',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Fredoka One',
      textTransform: 'uppercase',
      fontSize: '1.5em',
      padding: '1em',
      overflowWrap: 'anywhere',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    collide: {
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
    infoAlert: { width: '20%', padding: '1em' },
    movingContainer: {
      height: '2em',
      width: '2em',
      position: 'absolute',
      borderRadius: '100%',
      backgroundColor:
        nameBgColors[Math.floor(Math.random() * nameBgColors.length)],
      border: 'solid 5px',
    },
    inputTest: {
      opacity: 0,
      position: 'absolute',
      bottom: '0',
      zIndex: 0,
    },
  });

  const [openAlert, setOpenAlert] = React.useState(true);
  const classes = useStyles();
  const names = ['REBECCA', 'very', 'cute'];
  const namesElement: HTMLCollectionOf<Element> =
    document.getElementsByClassName(`${classes.name}`);

  const containerOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Space') {
      moveBall();
    }
  };

  function isOverlap(a: HTMLDivElement, b: HTMLDivElement | null | Element) {
    if (b !== null) {
      let movingDiv = a.getBoundingClientRect();
      let target = b.getBoundingClientRect();

      if (
        movingDiv.left < target.left + target.width &&
        movingDiv.left + movingDiv.width > target.left &&
        movingDiv.top < target.top + target.height &&
        movingDiv.top + movingDiv.height > target.top
      ) {
        gsap.to(`#${b.id}`, {
          duration: 1,
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
          onComplete: () => {
            gsap.to(`#${b.id}`, {
              duration: 1,
              backgroundColor:
                nameBgColors[Math.floor(Math.random() * nameBgColors.length)],
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
      rotate: 360,
      repeatRefresh: true,
      backgroundColor: `random([
        '#ff0aba',
        '#00ffcc',
        '#0aa5ff',
        '#eff900',
        '#00fa00',
        '#ff0000',
        '#0540f1',
      ])`,
    });

    gsap.to(`.${classes.name}`, {
      y: '-2em',
      stagger: {
        each: 0.1,
        ease: 'bounce.inOut(3.0)',
        repeat: -1,
        yoyo: true,
      },
    });
    // eslint-disable-next-line
  }, []);

  const moveBall = () => {
    // on keypress space move .movingContainer up, while its moving run function isOverlap to
    // check if its touching name container
    // when coming back down do the same
    gsap.to(`.${classes.movingContainer}`, {
      y: -window.innerHeight,
      duration: 3,
      onUpdate: function () {
        for (let i = 0; i < namesElement.length; i++) {
          isOverlap(this._targets[0], namesElement[i]);
        }
      },
      onComplete: () => {
        gsap.to(`.${classes.movingContainer}`, {
          y: 0,
          duration: 3,
          ease: 'power.in',
          onUpdate: function () {
            for (let i = 0; i < namesElement.length; i++) {
              isOverlap(this._targets[0], namesElement[i]);
            }
          },
        });
      },
    });
  };

  return (
    <div className={classes.container} onClick={moveBall}>
      <div className={classes.roomIdContainer}>
        <span>ROOMID</span>
      </div>
      <div className={classes.namesContainer}>
        {names.map((name, index) => (
          <div
            className={classes.name}
            id={`user${index}`}
            style={{
              backgroundColor:
                nameBgColors[Math.floor(Math.random() * nameBgColors.length)],
            }}
          >
            {name}
          </div>
        ))}
      </div>
      <div className={classes.infoAlert}>
        <Collapse in={openAlert}>
          <Alert
            variant="outlined"
            severity="info"
            onClose={() => {
              setOpenAlert(false);
            }}
          >
            Hit Space
          </Alert>
        </Collapse>
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
