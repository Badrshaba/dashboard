import { Button } from "@chakra-ui/react"
import { Image } from "antd"
import { Trash } from "lucide-react"
import { useState } from "react"


const ImageCompounant = ({deleteImage,item}) => {
    const [show,setShow] = useState(false)

  return (
    <div className="flex items-start  m-1">
    <Image width={100}  src={item.image} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>{setTimeout(()=>setShow(false),2000)}}   />
        {show&&<Button size={"xs"}   > <Trash size={15}  onClick={()=>deleteImage(item.id)} color="red" /></Button>}
    </div>
  )
}

export default ImageCompounant