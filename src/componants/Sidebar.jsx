import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"
const Sidebar = () => {
  const [openMain, setOpenMain] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  return (
    <div className="">
      <ul>
        <li onClick={() => setOpenMain(!openMain)}>
          <Link to={"/"}>Main</Link>{" "}
          {openMain ? <ChevronUp /> : <ChevronDown />}
        </li>
        {openMain && (
          <div>
            <li>
              {" "}
              <Link to={"/"}>main #1</Link>
            </li>
            <li>
              {" "}
              <Link to={"/"}>main #2</Link>
            </li>
          </div>
        )}
        <li onClick={() => setOpenAbout(!openAbout)}>
          <Link to={"/about"}>About</Link> {openAbout ? <ChevronUp /> : <ChevronDown />}
        </li>
        {openAbout && (
          <div>
            <li>
              {" "}
              <Link to={"/"}>about #1</Link>
            </li>
            <li>
              {" "}
              <Link to={"/"}>about #2</Link>
            </li>
          </div>
        )}
        <li onClick={() => setOpenContact(!openContact)}>
          <Link to={"/contact"}>Contact</Link> {openContact ? <ChevronUp /> : <ChevronDown />}
        </li>
        {openContact && (
          <div>
            <li>
              {" "}
              <Link to={"/"}>contact #1</Link>
            </li>
            <li>
              {" "}
              <Link to={"/"}>contact #2</Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
