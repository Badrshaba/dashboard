import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormLabel, Input, Box, Button, Spinner } from '@chakra-ui/react';
import { loginAsync } from '../../redux/thunck/userAsync';

const Login = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className='bg-gray-200 flex items-center justify-center'>
        <img
          src='https://resido.w-manage.org/assets/images/logo/logo.png'
          alt='Resido Logo'
          className=' animate-bounce'
        />
      </div>
      <div className='flex items-center'>
        <FormControl paddingInline={20}>
          <Box mb={10}>
            <FormLabel>Email</FormLabel>
            <Input
              id='email'
              type='email'
              placeholder='Email'
              isRequired
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={10}>
            <FormLabel>Password</FormLabel>
            <Input
              id='password'
              type='password'
              placeholder='Password'
              isRequired
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            colorScheme='teal'
            onClick={() => dispatch(loginAsync({ email, password }))}
            disabled={user.isLoading ? true : false}
          >
            {user.isLoading ? <Spinner color='white' /> : 'Login'}
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default Login;
