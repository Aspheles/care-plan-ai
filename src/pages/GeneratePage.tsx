import Section from '../components/ui/Section';
import Editable from '../components/ui/Editable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useClientData from '../hooks/useClientData';
import Loading from '../components/ui/LoadingState';
import type { Client } from '../types/interface';
import Button from '../components/ui/Button';

export default function GeneratePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [error, setError] = useState({ state: false, text: '' });
  const navigate = useNavigate();
  const { addClient } = useClientData();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentClient?.name) {
      setError({
        state: true,
        text: 'Naam moet langer zijn dan 3 tekens.',
      });

      return;
    }

    setIsSaving(true);

    await new Promise((res) => setTimeout(res, 2000));

    addClient({ ...currentClient });
    navigate('/dashboard');
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='mx-auto'>
        <Button
          onClick={() => navigate('/dashboard')}
          className='mb-4 text-blue-600 cursor-pointer hover:underline'
        >
          ← Terug
        </Button>

        <h1 className='text-2xl font-bold'>Zorgplan</h1>
        <p className='text-sm text-gray-500'>
          Beheer cliëntgegevens en zorginformatie
        </p>

        <div className='bg-white rounded-2xl shadow-sm'>
          {!isSaving && (
            <form onSubmit={handleSubmit}>
              <Section title='Algemene gegevens'>
                <div>
                  <label className='text-sm text-gray-500'>
                    Volledige naam
                  </label>
                  {error.state && (
                    <p className='text-red-400 mt-1'>* {error.text}</p>
                  )}
                  <Editable
                    name='name'
                    className='w-full border border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={currentClient?.name || ''}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
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
          )}

          {isSaving && (
            <div className='py-10'>
              <Loading text='Client wordt opgeslagen...' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
