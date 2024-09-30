import { useEffect } from "react"
import TableRequest from "./TableRequest"
import { useDispatch, useSelector } from "react-redux"
import { getAllRequestsForEbrooker } from "../../../redux/thunck/crudRequestEbrooker"
import { getAllRequestsForSales } from "../../../redux/thunck/crudRequestSales"


const RequestSales = () => {
    const {RequestSales} = useSelector((state) => state.RequestSales)
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(getAllRequestsForSales())
    }, [])
    console.log(RequestSales);
  return (
    <div className=" p-4">
 <TableRequest sales={RequestSales}/>
    </div>
  )
}

export default RequestSales