import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPackages } from "../../../redux/thunck/crudPackege"
import TablePackage from "./TablePackage"
import AddPackage from "./AddPackage"


const Package = () => {
    const {packages} = useSelector((state) => state.packages)
    const dispatch = useDispatch()
    useEffect(()=>{
dispatch(getPackages())
    },[])
  return (
    <div className='bg-white p-3 rounded-md' >
          <h3 className='text-3xl'>Packages</h3>
<AddPackage  />
<TablePackage packages={packages} />
    </div>
  )
}

export default Package 