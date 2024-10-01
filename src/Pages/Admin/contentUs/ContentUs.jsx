import { useState } from "react";
import InputBultIn from "../../../componants/input/InputBultIn"
import { Button } from "@chakra-ui/react";
import { getUsersApi } from "../../../utils/api";


const ContentUs = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        whatsapp: '',
      });
      const [errors, setErrors] = useState({
        phone: '',
        email: '',
        whatsapp: '',
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if ( value.length > 50) return setErrors((prevData)=>({
          ...prevData,
          [name]:"max length is 50 "
        }))
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.phone === '') return setErrors((prevData)=>({
          ...prevData,
          phone:"phone is requared"
        }))
        if (formData.whatsapp === '') return setErrors((prevData)=>({
          ...prevData,
          whatsapp:"whatsapp is requared"
        }))
        if (formData.email === '') return setErrors((prevData)=>({
          ...prevData,
          email:"email is requared"
        }))
        console.log(formData);
        setLoading(true)
        try {
            const {data} = getUsersApi.post('/content-us',formData)
            setLoading(false)
        } catch (error) {
            
            setLoading(false)
        }
      }
  return (
    <div className=" flex flex-col justify-center items-center" >
        <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-3 w-5/6 " >
        <InputBultIn label="Phone" name="phone" type="text" value={formData.phone} handleChange={handleChange} error={errors.phone} />
        <InputBultIn label="WhatsApp" name="whatsapp" type="text" value={formData.whatsapp} handleChange={handleChange} error={errors.whatsapp} />
        <InputBultIn label="Email" name="email" type="text" value={formData.email} handleChange={handleChange} error={errors.email}   />
        <Button colorScheme="teal" isLoading={loading} type="submit">Submit</Button>
        </form>
    </div>
  )
}

export default ContentUs