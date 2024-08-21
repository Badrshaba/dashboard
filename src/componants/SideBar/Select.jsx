import { ChevronDown, ChevronRight, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Select = ({ icon, children, title, open, setOpen }) => {
  // const [openMain, setOpenMain] = useState(false)

  return (
    <li
      onClick={() => setOpen((pev) => (pev == title ? '' : title))}
      className='flex flex-col  w-full'
    >
      <li className='flex items-center justify-between space-x-8 px-3 py-1 hover:text-green-500 hover:bg-green-50 rounded-xl hover:border-l-8 hover:border-green-700 hover:cursor-pointer	'>
        <span className=' flex items-center space-x-2'>
          <span>{icon}</span>
          <span>{title}</span>
        </span>
        <span>{open == title ? <ChevronDown /> : <ChevronRight />}</span>
      </li>
      {open == title && (
        <ul>
          {children?.map((child, index) => (
            <li
              key={index}
              className='flex items-center pl-6 space-x-2 hover:text-green-500 hover:cursor-pointer'
            >
              <Circle size={7} />
              <Link to={child.route}>{child.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Select;
