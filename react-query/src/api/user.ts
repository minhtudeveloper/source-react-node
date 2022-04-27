import { useFetch } from 'utils/reactQuery';
import { apiRoutes } from 'utils/routes';

export const useGetUsers = () => {
  const context: any = useFetch<{ user: string }>(
    apiRoutes.user,
    undefined,
    {
      retry: 3
    },
    {
      key: 'user',
      param: 'id'
    }
  );
  return { ...context, data: context.data?.data };
};

