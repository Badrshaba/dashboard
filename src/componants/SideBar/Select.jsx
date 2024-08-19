import { ChevronDown, ChevronRight, ChevronUp, CircleDot } from "lucide-react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Select = ({ icon, children ,title}) => {
  const [openMain, setOpenMain] = useState(false);
  

  return (
    
      <li onClick={() => setOpenMain(!openMain)} className=" d-flex flex-column ">
     <span className=" d-flex align-items-center">
     {icon}{title}
     {openMain ? <ChevronDown /> : <ChevronRight />}
     </span>
        {openMain&& <ul>{children?.map((child,index)=>(
            <li key={index} ><Link to={child.route}>{child.title}</Link></li>
        ))}</ul>}
      </li>
      
    
  );
};

export default Select;
