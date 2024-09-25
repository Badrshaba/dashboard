import ImagesTools from "./ImagesTools"
import PayTools from "./PayTools"
import ModalTools from "./ModalTools"
import MasterTools from "./MasterTools"
import FloorTools from "./FloorTools"


const Tools = ({floorplancompound,modelcompound,paymentplancompound,imagecompound,masterplancompound}) => {

  return (
    <div className="py-4 px-8" >
        <div className=" space-y-2" >
        <ImagesTools imagecompound={imagecompound} />
        <PayTools paymentplancompound={paymentplancompound}  />
        <ModalTools modelcompound={modelcompound} />
        <MasterTools masterplancompound={masterplancompound} />
        {/* <FloorTools floorplancompound={floorplancompound} /> */}
      
    </div>
    </div>
  )
}

export default Tools