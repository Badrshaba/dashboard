import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getUsersApi } from '../../utils/api';

const useGetUsers = () => {
  return useSuspenseQuery({
    queryKey: ['Users'],
    queryFn: async () => {
      const { data } = await getUsersApi.get(`/All-Users`);
      return data;
    },
    staleTime: 5 * 1000,
    retry: false,
  });
};

export default useGetUsers;
