import { useEffect, useState } from "react";
import InputBultIn from "../../../componants/input/InputBultIn"
import { Button } from "@chakra-ui/react";
import { getUsersApi } from "../../../utils/api";
import { notification } from "antd";



const ContentUs = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(null);
      const [errors, setErrors] = useState({
        phone_number: '',
        email: '',
        whats_app: '',
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
        if (formData?.phone_number === '') return setErrors((prevData)=>({
          ...prevData,
          phone_number:"phone_number is requared"
        }))
        if (formData?.whats_app === '') return setErrors((prevData)=>({
          ...prevData,
          whats_app:"whats_app is requared"
        }))
        if (formData?.email === '') return setErrors((prevData)=>({
          ...prevData,
          email:"email is requared"
        }))
        console.log(formData);
        setLoading(true)
        try {
            const {data} = getUsersApi.post('/contact-us?_method=PUT',formData)
            notification.success({
              description: 'Successfully Update contant.!',
              duration: 2,
              showProgress: true,
              message: 'Update contant',
              placement: 'topRight',
            });
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
      }
      const getContentUs = async() =>{
        try {
          const {data} = await getUsersApi.get('/contact-us')
          console.log(data?.data);
          setFormData(data?.data);
      } catch (error) {
          setLoading(false)
      }
      }
      useEffect(() => {
        getContentUs()
      },[])
  return (
    <div className=" flex flex-col justify-center items-center" >
        <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-3 w-5/6 " >
        <InputBultIn label="Phone" name="phone_number" type="text" value={formData?.phone_number} handleChange={handleChange} error={errors.phone_number} />
        <InputBultIn label="Whatsapp" name="whats_app" type="text" value={formData?.whats_app} handleChange={handleChange} error={errors.whats_app} />
        <InputBultIn label="Email" name="email" type="text" value={formData?.email} handleChange={handleChange} error={errors.email}   />
        <Button colorScheme="teal" isLoading={loading} type="submit">Submit</Button>
        </form>
    </div>
  )
}

export default ContentUs