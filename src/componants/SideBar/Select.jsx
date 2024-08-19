import { ChevronDown, ChevronRight, ChevronUp, Circle, CircleDot } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Select = ({ icon, children, title }) => {
  const [openMain, setOpenMain] = useState(false);

  return (
    <li onClick={() => setOpenMain(!openMain)} className="flex flex-col pl-10 hover:border-l-green-500">
      <span className="flex items-center space-x-2 px-2 py-1 hover:text-green-500 hover:bg-green-50 rounded-xl w-full" >
        {icon}
        {title}
        {openMain ? <ChevronDown /> : <ChevronRight />}
      </span>
      {openMain && (
        <ul>
          {children?.map((child, index) => (
            <li key={index} className="flex items-center space-x-2 hover:text-green-500" >
            <Circle size={7}/><Link to={child.route}>{child.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Select;
