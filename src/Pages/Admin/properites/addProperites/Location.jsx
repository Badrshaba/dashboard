import { Input } from "@chakra-ui/react"


const Location = () => {
  return (
    <div className=" ml-3" >
        <h3 className=' text-xl fw-semibold text-[#4D5454] mt-5' >3.Location</h3>
        <div className=" space-x-3 mt-3" >
            <Input width={212} placeholder="Address.."/>
            <Input width={212} placeholder="Nearby Landmark"/>
        </div>
    </div>
  )
}

export default Location