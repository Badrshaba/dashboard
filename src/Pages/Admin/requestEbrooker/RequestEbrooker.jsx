import { useEffect } from "react"
import TableRequest from "./TableRequest"
import { useDispatch, useSelector } from "react-redux"
import { getAllRequestsForEbrooker } from "../../../redux/thunck/crudRequestEbrooker"


const RequestEbrooker = () => {
  const {RequestEbrookers} = useSelector((state) => state.RequestEbrooker)
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(getAllRequestsForEbrooker())
  }, [])
  return (
    <div className=" p-4">
 <TableRequest ebrooker={RequestEbrookers}/>
    </div>
  )
}

export default RequestEbrooker