import { Grid, GridItem, FormControl, FormLabel, Input, Box } from '@chakra-ui/react';

const Login = () => {
  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className='bg-red-500'>test</div>
      <FormControl
        paddingInline={20}
        flex='col'
        alignItems='center'
      >
        <Box>
          <FormLabel>Username</FormLabel>
          <Input
            type='email'
            placeholder='Email'
            isRequired
          />
        </Box>
      </FormControl>
    </div>
  );
};

export default Login;
