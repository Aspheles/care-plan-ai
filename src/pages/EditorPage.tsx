import { usePlanData } from '../hooks/usePlanData';
import Editable from '../components/Editable';
import Section from '../components/Section';
import Button from '../components/ui/Button';
import type { Client, FormData } from '../types/interface';
import React, { useState } from 'react';
import Loading from '../components/ui/Loading';
import useClientData from '../hooks/useClientData';
import { MdDeleteOutline, MdOutlineAddCircle } from 'react-icons/md';

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

  const generateClientPlan = async () => {
    if (!plan) return;

    setLoading(true);

    setFormData({
      name: client.name,
      plan: client.plan ?? plan,
    });

    setLoadingText(
      client.plan
        ? 'Zorgplan wordt opgehaald...'
        : 'Zorgplan wordt opgesteld...',
    );

    await new Promise((res) => setTimeout(res, 2000));

    setLoading(false);
  };

  if (!formData.name && plan && !loading && client) {
    generateClientPlan();
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    addClientPlan(client.id, { ...formData.plan });

    onBack();
  };

  const handleInterventionChange = (id: number, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      plan: {
        ...prevState.plan,
        interventions: prevState.plan.interventions.map((item) =>
          item.id === id ? { ...item, description: value } : item,
        ),
      },
    }));
  };

  const addIntervention = () => {
    setFormData((prevState) => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        plan: {
          ...prevState.plan,
          interventions: [
            ...prevState.plan.interventions,
            {
              id: Math.floor(Math.random() * 1000),
              description: '',
            },
          ],
        },
      };
    });
  };

  const removeIntervention = (id: number) => {
    if (!id) return;

    setFormData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        plan: {
          ...prevState.plan,
          interventions: prevState.plan.interventions.filter(
            (i) => i.id !== id,
          ),
        },
      };
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <button onClick={onBack} className='mb-4 text-blue-600 cursor-pointer'>
        ← Terug
      </button>

      <h1 className='text-xl font-bold mb-2'>{client.name}</h1>
      <p className='text-sm text-gray-500 mb-4'>
        AI voorstel — controleer en pas aan
      </p>

      {!formData.name && (
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
          <div className='mt-10 text-center'>
            <p className='text-lg'>{loadingText}</p>
            <Loading />
          </div>
        )}

        {plan && formData.name && !isLoading && !loading && (
          <div className='space-y-4'>
            <form onSubmit={handleSubmit}>
              <Section title='Probleem'>
                <Editable
                  onChange={(event) => {
                    setFormData((prev) => ({
                      ...prev,
                      plan: { ...prev.plan, problem: event.target.value },
                    }));
                  }}
                  name='problem'
                  value={formData.plan.problem}
                  type='text'
                />
              </Section>

              <Section title='Doel'>
                <Editable
                  onChange={(event) => {
                    setFormData((prev) => ({
                      ...prev,
                      plan: { ...prev.plan, goal: event.target.value },
                    }));
                  }}
                  name='goal'
                  value={formData.plan.goal}
                />
              </Section>

              <Section title='Interventies'>
                {formData.plan.interventions.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-3 mt-2 w-full'
                  >
                    <Editable
                      name='intervention'
                      value={item.description}
                      onChange={(event) =>
                        handleInterventionChange(item.id, event.target.value)
                      }
                    />

                    <Button
                      onClick={() => removeIntervention(item.id)}
                      type='button'
                      className='p-2 bg-red-500 text-white hover:scale-125 transition-transform duration-150 cursor-pointer'
                    >
                      <span>
                        <MdDeleteOutline size={23} />
                      </span>
                    </Button>
                  </div>
                ))}

                <Button
                  onClick={addIntervention}
                  className='cursor-pointer bg-blue-500 text-primary mt-4 ml-1 p-2 text-white hover:scale-125 transition duration-300'
                  type={'button'}
                >
                  <span>
                    <MdOutlineAddCircle size={25} />
                  </span>
                </Button>
              </Section>

              <Section title='Evaluatie'>
                <Editable
                  onChange={(event) => {
                    setFormData((prev) => ({
                      ...prev,
                      plan: { ...prev.plan, evaluation: event.target.value },
                    }));
                  }}
                  name={'evaluation'}
                  value={formData.plan.evaluation}
                />
              </Section>

              <div className='fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex gap-2'>
                <Button
                  onClick={generateClientPlan}
                  className='flex-1 bg-gray-500 p-3 rounded-xl text-white cursor-pointer'
                  type={'button'}
                >
                  Opnieuw
                </Button>
                <Button
                  type={'submit'}
                  className='cursor-pointer bg-green-600 text-primary text-white'
                >
                  Goedkeuren
                </Button>
              </div>
            </form>
          </div>
        )}
      </>
    </div>
  );
}
