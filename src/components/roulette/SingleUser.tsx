import React from 'react';
import { ISingleUserProps } from './types';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import 'typeface-fredoka-one';

function SingleUser(props: ISingleUserProps) {
  const matches = useMediaQuery('(max-width: 426px)');

  const useStyles = makeStyles({
    container: {
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    texts: {
      fontFamily: 'Fredoka One',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        transform={`rotate(${props.degree})`}
        fill="black"
      >
        <path id="MyPath" fill="none" stroke="white" d="M 50 50 L 50 0" />
        <text className={classes.texts}>
          <textPath
            href="#MyPath"
            font-size={matches ? '5' : '5'}
            startOffset="5"
            textLength="40%"
            // spacing="auto"
            alignment-baseline="text-before-edge"
            lengthAdjust="spacingAndGlyphs"
          >
            {props.name}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default SingleUser;
