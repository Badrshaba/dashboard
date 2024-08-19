
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"
import img from "../../assets/images/logo-sm.png"
import Select from "./Select";
import {Data} from './data' 
import { House } from "lucide-react";
const Sidebar = () => {
  return (
    <div className=" d-flex justify-content-center flex-column bg-body-secondary">
<div className=" d-flex align-items-center mx-auto pt-5">
  <img src={img} width={35} alt="logo" />
  <h2 className="text-red-400">Rizz</h2>
</div>
<ul>
{Data?.map((ele,index)=>(
  <Select title={ele.title} icon={<House size={13} color="#696363" />} children={ele.listItems} key={index}/>
  
))}
</ul>
    </div>
  );
};

export default Sidebar;
