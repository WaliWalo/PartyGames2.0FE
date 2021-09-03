import React, { useEffect } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { IBarProps } from './types';
import gsap from 'gsap/src/all';

function Bar(props: IBarProps) {
  const matches = useMediaQuery('(max-width: 426px)');
  const dimensions = matches ? '15em' : '40vw';
  const useStyles = makeStyles({
    barContainer: {
      backgroundColor: 'black',
      height: dimensions,
      width: dimensions,
      position: 'absolute',
      right: '30%',
      top: '10%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'column',
    },
    wave: { width: '20vw', marginBottom: '-0.1em' },
    bar: {
      height: `0px`,
      width: '20vw',
      display: 'flex',
      alignItems: 'flex-start',
      backgroundImage:
        'linear-gradient(to top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
    },
  });

  const classes = useStyles();

  useEffect(() => {
    gsap.to('#wavePath', {
      duration: 2,
      attr: {
        d: 'M0,160L60,160C120,160,240,160,360,133.3C480,107,600,53,720,69.3C840,85,960,171,1080,218.7C1200,267,1320,277,1380,282.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
      },
      ease: 'Power1.easeInOut',
      repeat: -1,
      yoyo: true,
    });
    gsap.to(`.${classes.bar}`, {
      height: `${props.height}px`,
      duration: 2,
      ease: 'Power1.easeInOut',
    });
  });

  return (
    <div className={classes.barContainer}>
      <div className={classes.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            id="wavePath"
            fill="#5FFBF1"
            fill-opacity="1"
            d="M0,256L60,218.7C120,181,240,107,360,117.3C480,128,600,224,720,229.3C840,235,960,149,1080,128C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className={classes.bar}></div>
    </div>
  );
}

export default Bar;
