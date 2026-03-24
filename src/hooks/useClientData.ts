import { generateFakeClients } from '../services/fakeApi';
import type { Client } from '../types/carePlan';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// const useClientData = () => {
//   const [clients, setClients] = useState<Client[] | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchClients = async () => {
//     setIsLoading(true);

//     try {
//       const data = (await generateFakeClients()) as Client[];
//       setClients(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addClient = () => {
//     if (!clients) return;
//     const copyArray = [...clients];

//     console.log(copyArray);

//     copyArray.push({ id: 99, name: 'testing', status: 'error', plan: null });

//     console.log(copyArray);

//     setClients(copyArray);
//     // setClients((prevState) => {
//     //   if (!prevState) return prevState;

//     //   return copyArray;
//     // });
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   return { clients, isLoading, addClient };
// };

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
    queryClient.setQueryData(['clients'], (old: Client[] = []) => [
      ...old,
      {
        id: `client-${Math.floor(Math.random() * 10000)}`,
        name: client.name,
        status: client.status,
        plan: client.plan,
      },
    ]);
  };

  return { clients, isLoading, isFetching, addClient };
};

export default useClientData;
