import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useClientData from '../hooks/useClientData';
import Loading from '../components/ui/LoadingState';
import type { Client, Error } from '../types/interface';
import Button from '../components/ui/Button';
import ClientCreateForm from '../components/client/ClientCreateForm';

export default function GeneratePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error>({ state: false, text: '' });
  const navigate = useNavigate();
  const { addClient } = useClientData();

  const handleSubmit = async (
    event: React.ChangeEvent<HTMLFormElement>,
    currentClient: Client,
  ) => {
    event.preventDefault();

    if (!currentClient.name) {
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
            <ClientCreateForm handleSubmit={handleSubmit} error={error} />
          )}
        </div>
        {isSaving && (
          <div className='py-10'>
            <Loading text='Client wordt opgeslagen...' />
          </div>
        )}
      </div>
    </div>
  );
}
