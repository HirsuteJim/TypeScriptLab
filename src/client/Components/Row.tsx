import React from 'react';
import Box from './Box';
import {RowProps} from './../../types';

const Row = (props: RowProps): JSX.Element => {
  let myRowArray: JSX.Element[] = [
    <Box key={`r${props.row}c${0}`} key1={`r${props.row}c${0}`} handleBoxClick={props.handleBoxClick} content={props.content[0]}/>,
    <Box key={`r${props.row}c${1}`} key1={`r${props.row}c${1}`} handleBoxClick={props.handleBoxClick} content={props.content[1]}/>,
    <Box key={`r${props.row}c${2}`} key1={`r${props.row}c${2}`} handleBoxClick={props.handleBoxClick} content={props.content[2]}/>,
  ];

  return <div className='row'>{myRowArray}</div>;
};


export default Row;