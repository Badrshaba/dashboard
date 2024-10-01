import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"


const InputBultIn = ({label,handleChange,error,name,value,type='text'}) => {

  return (
<FormControl isInvalid={error}>
                  <FormLabel>{label} :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
  )
}

export default InputBultIn