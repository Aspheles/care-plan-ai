import Editable from '../../components/ui/Editable';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import type { FormData, Intervention } from '../../types/interface';
import InterventionsField from './InterventionsField';

interface ClientFormProps {
  formData: FormData;
  updateFormData: (
    field: keyof FormData['plan'],
    value: string | Intervention[],
  ) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  generateClientPlan: (newFetch?: boolean) => void;
}

const ClientForm = ({
  formData,
  updateFormData,
  handleSubmit,
  generateClientPlan,
}: ClientFormProps) => {
  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <Section title='Probleem'>
        <Editable
          onChange={(event) => updateFormData('problem', event.target.value)}
          name='problem'
          value={formData.plan.problem}
        />
      </Section>

      <Section title='Doel'>
        <Editable
          onChange={(event) => updateFormData('goal', event.target.value)}
          name='goal'
          value={formData.plan.goal}
        />
      </Section>

      <Section title='Interventies'>
        <InterventionsField
          interventions={formData.plan.interventions}
          onChange={(updated) => updateFormData('interventions', updated)}
        />
      </Section>

      <Section title='Evaluatie'>
        <Editable
          onChange={(event) => updateFormData('evaluation', event.target.value)}
          name='evaluation'
          value={formData.plan.evaluation}
        />
      </Section>

      <div className='fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex gap-2'>
        <Button
          onClick={() => generateClientPlan(true)}
          className='flex-1 bg-gray-500 p-3 rounded-xl text-white cursor-pointer'
          type='button'
        >
          Opnieuw
        </Button>
        <Button
          type='submit'
          className='cursor-pointer bg-green-600 text-white'
        >
          Goedkeuren
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
