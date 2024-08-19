import { Link } from "react-router-dom"


const Sidebar = () => {
  return (
    <div className="">
      <ul>
      <li><Link to={'/'}>main</Link></li>  
      <li><Link to={'/about'}>about</Link></li>  
      <li><Link to={'/contact'}>contact</Link></li>  
      </ul>
    </div>
  )
}

export default Sidebar