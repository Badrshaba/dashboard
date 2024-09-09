import { Button, Input, Select, Stack } from '@chakra-ui/react'
import React from 'react'

const PropertyDetails = () => {
  return (
    <div>

<h3 className=' text-xl fw-semibold text-[#4D5454] ml-3' >1.Property Details</h3>

 <div className=' flex justify-between'>
 <div className=' w-full '>
  <div className=' flex w-3/5 space-x-2 px-3 mt-4' >
        <Select placeholder='Property Details' >
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
        </Select>
        <Input  placeholder='Compound Name...' className=' bg-stone-700' isDisabled />
        </div>
        <div className=' flex space-x-3 w-8/12 mt-4 ml-3'>
        <Stack>
        <Select placeholder='Zone' style={{width:120}} >
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
        </Select>
        </Stack>
        <Stack>
        <Select placeholder='Floor No.' style={{width:175}} >
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
        </Select>
        </Stack>
        <Stack>
        <Select style={{width:113}} placeholder='Modal' >
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
        </Select>
        </Stack>
        <Select placeholder='No. of Availability' >
  <option value='option1'>Option 1</option>
  <option value='option2'>Option 2</option>
  <option value='option3'>Option 3</option>
        </Select>
        <Input placeholder='Size/Area...' />
        </div>

  </div>
  <div className=' mx-3'>
      <Button colorScheme='teal' paddingX={10} >Save</Button>
  </div>
 </div>
    </div>
  )
}

export default PropertyDetails