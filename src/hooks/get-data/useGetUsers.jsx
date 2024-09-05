import { useQuery } from '@tanstack/react-query';
import { getUsersApi } from '../../utils/api';

const useGetUsers = () => {
  return useQuery({
    queryKey: ['Users'],
    queryFn: () => getUsersApi.get(`/All-Use`),
    staleTime: 5 * 1000,
    retry: false,
  });
};

export default useGetUsers;
