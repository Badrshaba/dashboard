import img from '../../assets/images/logo-sm.png';
import Select from './Select';
import { Data } from './data';
import { House } from 'lucide-react';
import './sidebar.css';
const Sidebar = () => {
  return (
    <div className="flex justify-center flex-col">
<div className="flex mx-auto pt-10 space-x-1 items-center">
  <img src={img} width={40} alt="logo" />
  <h2 className="text-black font-bold text-2xl">Rizz</h2>
</div>
<ul>
  <li className="uppercase text-gray-600 text-xs pt-8 pb-4 text-center">Main Menu</li>
{Data?.map((ele,index)=>(
  <Select title={ele.title} icon={<House size={13} color="#696363" />} children={ele.listItems} key={index}/>
))}
</ul>
    </div>
  );
};

export default Sidebar;
