//import PayTools from "../../compounds/compoundDeitals/PayTools"
//import FloorTools from "../../compounds/compoundDeitals/FloorTools"
//import MasterTools from "../../compounds/compoundDeitals/MasterTools"
import FloorTools from "./FloorTools"
import ImageTools from "./ImageTools"
import MasterTools from "./MasterTools"
import PaymentTools from "./PaymentTools"

const Tools = ({payment_plans,master_plans,images,floor_plans}) => {
  return (
    <div className=" px-4 mt-2 space-y-2">
        <ImageTools imagecompound={images} />
        <PaymentTools paymentplancompound={payment_plans} />
        <FloorTools floorplancompound={floor_plans}/>
        <MasterTools masterplancompound={master_plans} />
    </div>
  )
}

export default Tools