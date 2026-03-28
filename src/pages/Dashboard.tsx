import { useState } from 'react';
import { Editor } from './EditorPage';
import type { Client } from '../types/interface';
import { Link } from 'react-router-dom';

import Loading from '../components/ui/LoadingState';
import useClientData from '../hooks/useClientData';
import { IoMdPersonAdd } from 'react-icons/io';
import Button from '../components/ui/Button';
import { ClientList } from '../components/client/ClientList';

export default function Dashboard() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { clients, isLoading } = useClientData();

  if (selectedClient) {
    return (
      <Editor onBack={() => setSelectedClient(null)} client={selectedClient} />
    );
  }

  const updateSelectedClient = (client: Client) => {
    if (!client) return;
    setSelectedClient(client);
  };

  return (
    <>
      <Link to={'/generate-page'}>
        <Button className='w-full bg-blue-600 text-white p-4 text-lg mb-4 cursor-pointer hover:bg-blue-500'>
          <span className='flex justify-center items-center'>
            <IoMdPersonAdd size={30} className='mr-2' /> Nieuw Client
          </span>
        </Button>
      </Link>

      {isLoading ? (
        <div className='mt-10 text-center'>
          <Loading text='Client data wordt opgehaald...' />
        </div>
      ) : (
        <>
          {clients ? (
            <ClientList
              clients={clients}
              updateSelectedClient={updateSelectedClient}
            />
          ) : (
            <p>No Clients found</p>
          )}
        </>
      )}
    </>
  );
}
