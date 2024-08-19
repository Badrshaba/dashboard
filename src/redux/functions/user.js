import axios from 'axios';

export const login = async ({ email, password }) => {
  const { data } = await axios.post('', {
    email,
    password,
  });
  console.log(data);
};

export const register = async ({ username, email, password, confirmPassword }) => {
  const { data } = await axios.post(
    '',
    {
      username,
      email,
      password,
      confirmPassword,
    },
    {
      withCredentials: true,
    }
  );
  console.log(data);
};

export const logout = async () => {
  const { data } = axios.post('', {});
  console.log(data);
};
