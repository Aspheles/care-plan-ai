import { useCarePlan } from '../hooks/useCarePlan';
import Editable from '../components/Editable';
import Section from '../components/Section';
import Button from '../components/ui/Button';
import type { Client } from '../types/carePlan';

interface EditorProps {
  onBack: () => void;
  client: Client;
}

export function Editor({ onBack, client }: EditorProps) {
  const {
    localPlan,
    isLoading,
    isFetching,
    removeIntervention,
    addIntervention,
  } = useCarePlan();

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <button onClick={onBack} className='mb-4 text-blue-600 cursor-pointer'>
        ← Terug
      </button>

      <h1 className='text-xl font-bold mb-2'>{client.name}</h1>
      <p className='text-sm text-gray-500 mb-4'>
        AI voorstel — controleer en pas aan
      </p>

      {!localPlan && !isLoading && !isFetching && (
        <button className='w-full bg-blue-600 text-white p-4 rounded-2xl text-lg cursor-pointer'>
          Genereer zorgplan
        </button>
      )}

      {isLoading && (
        <div className='mt-10 text-center'>
          <p className='text-lg'>Zorgplan wordt opgesteld...</p>
        </div>
      )}

      {localPlan && (
        <div className='space-y-4'>
          <Section title='Probleem'>
            <Editable value={localPlan.problem} />
          </Section>

          <Section title='Doel'>
            <Editable value={localPlan.goal} />
          </Section>

          <Section title='Interventies'>
            {localPlan.interventions.map((item, i) => (
              <div className='flex justify-center justify-items-center'>
                <Editable className='mt-2' key={i} value={item.description} />
                <Button
                  onClick={() => removeIntervention(item.id)}
                  className='text-red-600 m-2 p-2 cursor-pointer font-bold'
                >
                  X
                </Button>
              </div>
            ))}

            <Button
              onClick={addIntervention}
              className='cursor-pointer bg-green-600 text-primary mt-2 p-2 text-white'
            >
              Add
            </Button>
          </Section>

          <Section title='Evaluatie'>
            <Editable value={localPlan.evaluation} />
          </Section>

          <div className='fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex gap-2'>
            <Button className='flex-1 bg-gray-400 p-3 rounded-xl text-white cursor-pointer'>
              Opnieuw
            </Button>
            <Button className='cursor-pointer bg-green-600 text-primary text-white'>
              Goedkeuren
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
