import { Input, Stack } from "@chakra-ui/react"


const PricingAndFinancialInformation = () => {
  return (
    <div>
 <h3 className=' text-xl fw-semibold text-[#4D5454] ml-3 mt-5' >2.Pricing and Financial Information</h3>
 <div className=" flex ml-3 mt-3">
 <div className=" flex justify-center items-center space-x-2 pl-2" >
    <p>Form</p>
    <Stack>
    <Input width={150} placeholder="Price.." />
    </Stack>
 </div>
 <div className=" flex justify-center items-center space-x-2 pl-2" >
    <p>To</p>
    <Stack>
    <Input width={150} placeholder="Price.." />
    </Stack>
 </div>
 </div>
    </div>
  )
}

export default PricingAndFinancialInformation