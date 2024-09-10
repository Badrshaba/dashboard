import React from 'react';
import Type from './Type';
import Status from './Status';
import Zone from './Zone';
import { Tabs } from 'antd';


const TabContent=()=>{
  return (
    <div className='bg-white'>
      lasd;a
    </div>
  )
}

const Other = () => {
  const tabs=[{label:"Zones",key:'1',children:<Zone/>},{label:"Type",key:'2',children:<Type/>},{label:"Status",key:'3',children:<Status/>}]
    const onChange = (key) => {
      console.log(key);
    };
  return <div className='mt-5' >
  <Tabs
    onChange={onChange}
    type="card"
    items={tabs}
    
  />
  </div>;
};

export default Other;


