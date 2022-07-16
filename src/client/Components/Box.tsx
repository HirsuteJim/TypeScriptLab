import React from 'react';
import {BoxProps} from './../../types';



const Box = (props : BoxProps): JSX.Element => {

  return (
    // <button className='box' onClick={() => {props.handleBoxClick(props.key1)}}>{props.content}</button>
    <button className='box' onClick={() => {props.handleBoxClick(props.key1)}}><p id="daMark">{props.content}</p></button>
  );
};

export default Box;