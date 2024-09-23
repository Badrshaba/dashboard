import { Text } from '@chakra-ui/react'
import { Select } from 'antd'


const Selector = ({name,handleChange,value,placeholder,size}) => {
  return (
    <div className=' flex flex-col'>
              <Text fontSize={12}>{placeholder} </Text>
        <Select
                size={size}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                 value={value}
                 style={{ width: '100px' }}
        >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
    </div>
  )
}

export default Selector