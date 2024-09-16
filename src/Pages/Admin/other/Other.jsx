import React from 'react';
import Type from './Type';
import Status from './Status';
import Zone from './Zone';
import { Tabs } from 'antd';

const Other = () => {
  const tabs=[{label:"Zones",key:'1',children:<Zone/>},{label:"Type",key:'2',children:<Type/>},{label:"Status",key:'3',children:<Status/>}]

  return <div className='mt-5' >
  <Tabs
    type="card"
    items={tabs}
    
  />
  </div>;
};

export default Other;


