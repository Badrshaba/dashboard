import ImagesTools from "./ImagesTools"
import PayTools from "./PayTools"
import ModalTools from "./ModalTools"


const Tools = ({modelcompound,paymentplancompound,imagecompound}) => {

  return (
    <div className=" px-8" >
        <div className=" space-y-2" >
        <ImagesTools imagecompound={imagecompound} />
        <PayTools paymentplancompound={paymentplancompound} />
        <ModalTools modelcompound={modelcompound} />
      
    </div>
    </div>
  )
}

export default Tools