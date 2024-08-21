import { Apple, Headset, House, Store } from "lucide-react";
import "./sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const DATA = [
  {
    title:"Dashboard",
    icon:<House size={18}/>,
    route:'/'
  },
  {
    title:"About",
    icon:<Store size={18} />,
    route:'/about'
  },
  {
    title:"Contact",
    icon:<Headset size={18} />,
    route:'/contact'
  },
  {
    title:"eman",
    icon:<Apple size={18} />,
    route:'/apple'
  },
]
const Sidebar = () => {
 // const [open, setOpen] = useState("");
  return (
    <div className="flex justify-center flex-col items-start">
      {/* <div className="flex mx-auto pt-10 space-x-1 items-center">
  <img src={img} width={45} alt="logo" />
  <h2 className="text-black font-bold text-3xl">Rizz</h2>
</div>
  <li className="uppercase text-gray-600 text-xs pt-8 text-center pl-6">Main Menu</li> */}
      <div className=" mx-auto pt-8">
        <img
          src="https://resido.w-manage.org/assets/images/logo/logo.png"
          width={150}
          alt="logo"
        />
      </div>
      <ul className=" flex justify-center flex-col w-full p-5 space-y-2">
        {/* {Data?.map((ele,index)=>(
  <Select title={ele.title} open={open} setOpen={setOpen} icon={<House size={13} color="#696363" />} children={ele.listItems} key={index}/>
))} */}
       <div className=" flex flex-col space-y-2 mt-3">
        {
          DATA.map((item)=>(
            <div className=" rounded px-3  hover:bg-[#087c7c] ">
          <Link
            to={item.route}
            className="flex items-center space-x-2 py-3 px-4 mx-auto text-base hover:text-white font-semibold"
          >
            {" "}
            <span>
              {" "}
              {item.icon}
            </span>{" "}
            <span>{item.title}</span>
          </Link>
        </div>
          ))
        }
       {/* <div className=" rounded px-3  hover:bg-[#087c7c] ">
          <Link
            to={"/"}
            className="flex items-center space-x-2 py-3 px-4 mx-auto text-base hover:text-white font-semibold"
          >
            {" "}
            <span>
              {" "}
              <House size={18} />
            </span>{" "}
            <span>Dashboard</span>
          </Link>
        </div>
        <div className=" rounded px-3  hover:bg-[#087c7c] ">
          <Link
            to={"/about"}
            className="flex items-center space-x-2 py-3 px-4  text-base hover:text-white font-semibold"
          >
            {" "}
            <span>
              {" "}
              <Store size={15} />
            </span>{" "}
            <span>About</span>
          </Link>
        </div>
        <div className=" rounded px-3  hover:bg-[#087c7c] ">
          <Link
            to={"/contact"}
            className="flex items-center space-x-2 py-3 px-4 text-base hover:text-white font-semibold"
          >
            {" "}
            <span>
              {" "}
              <Headset size={15} />
            </span>{" "}
            <span>Contact</span>
          </Link>
        </div>*/}
       </div> 
      </ul>
    </div>
  );
};

export default Sidebar;
