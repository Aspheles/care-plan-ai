import { generateCarePlan } from '../services/fakeApi';
import { type Plan, type Intervention } from '../types/carePlan';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useCarePlan = () => {
  const [localPlan, setLocalPlan] = useState<Plan | null>(null);

  const {
    data: plan,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<Plan>({
    queryKey: ['plan'],
    queryFn: () => generateCarePlan() as Promise<Plan>,

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && plan && !isError) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalPlan(plan);
    }
  }, [plan, isSuccess, isError, isLoading]);

  const updatePlan = (field: string, value: string) => {
    if (!localPlan) return;
    setLocalPlan({ ...localPlan, [field]: value });
  };

  const updateInterventions = (newInterventions: Intervention[]) => {
    setLocalPlan((prevState) => {
      if (!prevState) return prevState;

      return { ...prevState, interventions: newInterventions };
    });
  };

  const addIntervention = () => {
    setLocalPlan((prevState) => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        interventions: [
          ...prevState.interventions,
          {
            id: `intervention-${Math.floor(Math.random() * 1000)}`,
            description: '',
          },
        ],
      };
    });
  };

  const removeIntervention = (id: string) => {
    if (!id) return;

    setLocalPlan((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        interventions: prevState.interventions.filter((i) => i.id !== id),
      };
    });
  };

  return {
    isLoading,
    isFetching,
    updateInterventions,
    updatePlan,
    addIntervention,
    removeIntervention,
    localPlan,
  };
};
