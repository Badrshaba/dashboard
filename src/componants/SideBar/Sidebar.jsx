import img from '../../assets/images/logo-sm.png';
import Select from './Select';
import { Data } from './data';
import { House } from 'lucide-react';
import './sidebar.css';
import { useState } from 'react';
const Sidebar = () => {
  const [open, setOpen] = useState("");
  return (
    <div className="flex justify-center flex-col items-start">
<div className="flex mx-auto pt-10 space-x-1 items-center">
  <img src={img} width={45} alt="logo" />
  <h2 className="text-black font-bold text-3xl">Rizz</h2>
</div>
  <li className="uppercase text-gray-600 text-xs pt-8 text-center pl-6">Main Menu</li>
<ul className=' flex justify-center flex-col w-full p-5 space-y-2' >
{Data?.map((ele,index)=>(
  <Select title={ele.title} open={open} setOpen={setOpen} icon={<House size={13} color="#696363" />} children={ele.listItems} key={index}/>
))}
</ul>
    </div>
  );
};

export default Sidebar;
