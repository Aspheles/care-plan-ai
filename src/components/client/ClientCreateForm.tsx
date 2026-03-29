import Editable from '../ui/Editable';
import Section from '../ui/Section';
import Button from '../ui/Button';
import type { Client, Error } from '../../types/interface';
import { useState } from 'react';

interface ClientCreateFormProps {
  handleSubmit: (
    event: React.ChangeEvent<HTMLFormElement>,
    client: Client,
  ) => void;
  error: Error;
}

const ClientCreateForm = ({ handleSubmit, error }: ClientCreateFormProps) => {
  const [formData, setFormData] = useState<Client>({
    id: 0,
    name: '',
    status: '',
    plan: null,
  });

  return (
    <form onSubmit={(event) => handleSubmit(event, formData)}>
      <Section title='Algemene gegevens'>
        <div>
          <label className='text-sm text-gray-500'>Volledige naam</label>
          {error.state && <p className='text-red-400 mt-1'>* {error.text}</p>}
          <Editable
            name='name'
            className='w-full border border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={formData.name}
            onChange={(e) =>
              setFormData({
                id: Math.floor(Math.random() * 10000),
                name: e.target.value,
                status: 'Concept',
                plan: null,
              } as Client)
            }
          />
        </div>

        <div>
          <label className='text-sm text-gray-500'>Geboortedatum</label>
          <Editable
            name='birthdate'
            value=''
            type='date'
            className='w-full border border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </Section>

      <Button
        type={'submit'}
        className='w-full bg-blue-600 text-white p-4 mt-4 rounded-2xl text-lg cursor-pointer hover:bg-blue-500 transition'
      >
        Opslaan
      </Button>
    </form>
  );
};

export default ClientCreateForm;
