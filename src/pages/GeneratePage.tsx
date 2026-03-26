import Section from '../components/Section';
import Editable from '../components/Editable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useClientData from '../hooks/useClientData';
import Loading from '../components/ui/Loading';
import type { Client } from '../types/interface';

export default function GeneratePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const navigate = useNavigate();
  const { addClient } = useClientData();

  const saveClient = () => {
    if (!currentClient) return;
    setIsSaving(true);
    setTimeout(() => {
      // Call the api so the client can be saved into DB
      addClient(currentClient);
      navigate('/');
    }, 2000);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <button
        onClick={() => navigate('/')}
        className='mb-4 text-blue-600 cursor-pointer'
      >
        ← Terug
      </button>
      <h1 className='text-2xl font-bold mb-4'>Zorgplan</h1>

      {!isSaving && (
        <>
          <Section title='Client Volledige Naamt'>
            <input
              className={`w-full border rounded-xl p-2 `}
              value={currentClient?.name || ''}
              onChange={(e) =>
                setCurrentClient({
                  ...currentClient,
                  id: 9999,
                  name: e.target.value,
                  status: 'Concept',
                  plan: null,
                } as Client)
              }
            />
          </Section>

          <Section title='Client Geboorte Datum'>
            <Editable
              name='birthdate'
              className='mt-2'
              value=''
              type='date'
            ></Editable>
          </Section>

          <button
            onClick={saveClient}
            className='w-full bg-blue-600 text-white p-4 mt-6 rounded-2xl text-lg cursor-pointer hover:bg-blue-500'
          >
            Opslaan
          </button>
        </>
      )}

      {isSaving && (
        <div className='mt-10 text-center'>
          <p className='text-lg'>Client wordt opgeslagen...</p>
          <Loading />
        </div>
      )}
    </div>
  );
}
