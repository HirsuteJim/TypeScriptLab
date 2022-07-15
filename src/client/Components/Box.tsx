import React from 'react';
import {BoxProps} from './../../types';



const Box = (props : BoxProps): JSX.Element => {

  return (
    <button className='box' onClick={() => {props.handleBoxClick}}>props.content</button>
  );
};

export default Box;