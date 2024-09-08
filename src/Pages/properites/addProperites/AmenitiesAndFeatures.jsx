import { Input, Select } from '@chakra-ui/react'
import React from 'react'

const AmenitiesAndFeatures = () => {
  return (
    <div>
        <h3 className=' text-xl fw-semibold text-[#4D5454] ml-3 mt-5' > 4. Amenities and Features </h3>
        <div className=' flex space-x-3 ml-3 mt-3' >
            <Select placeholder='No.of Master bedrooms' width={237} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Select>
            <Select placeholder='No.of Bedrooms' width={185} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Select>
            <Select placeholder='No.of Bathrooms' width={131} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Select>
            <Select placeholder='No.of Balacony' width={185} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Select>
            <Select placeholder='View' width={127} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Select>

        </div>
    </div>
  )
}

export default AmenitiesAndFeatures