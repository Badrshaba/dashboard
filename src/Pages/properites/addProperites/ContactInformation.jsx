import { Input } from "@chakra-ui/react"


const ContactInformation = () => {
  return (
    <div className=" ml-3">
        <h3 className=' text-xl fw-semibold text-[#4D5454]  mt-5 mb-2'  >7.Contact Information</h3>
        <Input placeholder="phone number"  width={415} />
    </div>
  )
}

export default ContactInformation