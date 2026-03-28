import { usePlanData } from '../hooks/usePlanData';
import Button from '../components/ui/Button';
import type { Client, FormData } from '../types/interface';
import React, { useState } from 'react';
import Loading from '../components/ui/LoadingState';
import useClientData from '../hooks/useClientData';
import ClientForm from '../components/client/ClientForm';

interface EditorProps {
  onBack: () => void;
  client: Client;
}

export function Editor({ onBack, client }: EditorProps) {
  const { plan, isLoading } = usePlanData();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');

  const { addClientPlan } = useClientData();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    plan: { id: 0, problem: '', goal: '', interventions: [], evaluation: '' },
  });

  const generateClientPlan = async (newFetch: boolean = false) => {
    if (!plan) return;

    setLoading(true);

    setFormData({
      name: client.name,
      plan: client.plan && !newFetch ? client.plan : plan,
    });

    setLoadingText(
      client.plan
        ? 'Zorgplan wordt opgehaald...'
        : 'Zorgplan wordt opgesteld...',
    );

    await new Promise((res) => setTimeout(res, 2000));

    setLoading(false);
  };

  const updateFormData = <K extends keyof FormData['plan']>(
    field: K,
    value: FormData['plan'][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      plan: {
        ...prev.plan,
        [field]: value,
      },
    }));
  };

  // If client already has a plan data we initialize it
  if (client.plan && !formData.name) {
    generateClientPlan();
  }

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setLoadingText('Client informatie wordt opgeslagen...');

    await new Promise((res) => setTimeout(res, 2000));

    addClientPlan(client.id, { ...formData.plan });

    onBack();
  };

  return (
    <>
      <Button
        onClick={() => {
          onBack();
          setFormData((prev) => ({ ...prev, name: '' }));
        }}
        className='mb-4 text-blue-600 cursor-pointer'
      >
        ← Terug
      </Button>

      <h1 className='text-xl font-bold mb-2'>{client.name}</h1>
      <p className='text-sm text-gray-500 mb-4'>
        AI voorstel — controleer en pas aan
      </p>

      {!formData.name && !loading && (
        <div className=''>
          <Button
            type={'button'}
            className='w-full bg-blue-600 text-white p-4 rounded-2xl text-lg cursor-pointer'
            onClick={() => generateClientPlan()}
          >
            Genereer zorgplan
          </Button>
        </div>
      )}

      <>
        {loading && (
          <div className='mt-10'>
            <Loading text={loadingText} />
          </div>
        )}

        {formData.name && !isLoading && !loading && (
          <div className='space-y-4'>
            <ClientForm
              updateFormData={updateFormData}
              formData={formData}
              handleSubmit={handleSubmit}
              generateClientPlan={generateClientPlan}
            />
          </div>
        )}
      </>
    </>
  );
}
