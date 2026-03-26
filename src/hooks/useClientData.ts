import { generateFakeClients } from '../services/fakeApi';
import type { Client, Plan } from '../types/interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useClientData = () => {
  const queryClient = useQueryClient();

  const {
    data: clients,
    isLoading,
    isFetching,
  } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: () => generateFakeClients() as Promise<Client[]>,

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const addClient = (client: Client) => {
    queryClient.setQueryData(['clients'], (prevState: Client[] = []) => [
      ...prevState,
      {
        id: Math.floor(Math.random() * 10000),
        name: client.name,
        status: client.status,
        plan: client.plan,
      },
    ]);
  };

  const getClientById = (clientId: number) => {
    if (!clientId || !clients) return;

    return clients.find((client) => client.id === clientId);
  };

  const addClientPlan = (clientId: number, plan: Plan) => {
    queryClient.setQueryData<Client[]>(['clients'], (prevState) => {
      if (!prevState) return prevState;

      return prevState.map((client) =>
        client.id === clientId
          ? { ...client, plan: plan, status: 'Goedgekeurd' }
          : client,
      );
    });
  };

  return {
    clients,
    isLoading,
    isFetching,
    addClient,
    addClientPlan,
    getClientById,
  };
};

export default useClientData;
