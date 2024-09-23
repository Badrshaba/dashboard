import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { loginAsync } from '../../../redux/thunck/userAsync';
import { Link } from 'react-router-dom';

const Login = () => {
  const { error, isLoading } = useSelector((state) => state.user);
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
         <Link to={'/privacy_policy'} className='fixed top-3/4 text-teal-700 underline' > privacy policy </Link>
      </div>
      <div className='flex items-center flex-col justify-center'>
        {error && (
          <Alert
            status='error'
            mb={10}
          >
            <AlertIcon />
            <AlertTitle>Login Error</AlertTitle>
            <AlertDescription>
              {error.response ? error.response.data.data[0] : error.message}
            </AlertDescription>
          </Alert>
        )}

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
            isLoading={isLoading}
          >
            Login
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default Login;
