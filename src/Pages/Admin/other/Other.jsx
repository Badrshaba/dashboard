import React from 'react';
import Type from './Type';
import Status from './Status';
import Zone from './Zone';

const Other = () => {
  return <div className=' space-y-4' >
    <Zone/>
    <Type/>
    <Status/>
  </div>;
};

export default Other;
