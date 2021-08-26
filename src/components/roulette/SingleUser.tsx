import React, { useEffect } from 'react';
import { ISingleUserProps } from './types';
import { makeStyles } from '@material-ui/core';
import gsap from 'gsap/all';

function SingleUser(props: ISingleUserProps) {
  const useStyles = makeStyles({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: 'blue',
      borderRadius: '100%',
    },
    lineA: {},
  });

  const classes = useStyles();

  useEffect(() => {
    gsap.to(classes.container, {});
  }, []);

  return <div className={classes.container}></div>;
}

export default SingleUser;
