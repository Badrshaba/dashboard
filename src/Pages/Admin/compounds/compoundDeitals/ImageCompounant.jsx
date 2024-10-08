import { Button } from "@chakra-ui/react"
import { Image } from "antd"
import { Trash } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"


const ImageCompounant = ({deleteImage,item}) => {
    const [show,setShow] = useState(false)
    const { authButton } = useSelector((state) => state.authrization);

  return (
    <div className="flex items-start  m-1">
    <Image width={100}  src={item.image} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>{setTimeout(()=>setShow(false),2000)}}   />
        {authButton&&show&&<Button size={"xs"}   > <Trash size={15}  onClick={()=>deleteImage(item.id)} color="red" /></Button>}
    </div>
  )
}

export default ImageCompounant