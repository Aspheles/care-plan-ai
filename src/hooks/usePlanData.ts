import { generateCarePlan } from '../services/fakeApi';
import { type Plan } from '../types/interface';
import { useQuery } from '@tanstack/react-query';

export const usePlanData = () => {
  const {
    data: plan,
    isLoading,
    isFetching,
  } = useQuery<Plan>({
    queryKey: ['plan'],
    queryFn: () => generateCarePlan() as Promise<Plan>,

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    plan,
    isLoading,
    isFetching,
  };
};
