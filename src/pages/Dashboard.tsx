import { useState } from 'react';
import { Editor } from './EditorPage';
import type { Client } from '../types/interface';
import { Link } from 'react-router-dom';

import Loading from '../components/ui/Loading';
import useClientData from '../hooks/useClientData';

export default function Dashboard() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { clients, isLoading } = useClientData();

  if (selectedClient) {
    return (
      <Editor onBack={() => setSelectedClient(null)} client={selectedClient} />
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <h1 className='text-2xl font-bold mb-4'>Zorgplannen</h1>

      <Link to={'/generate-page'}>
        <button className='w-full bg-blue-600 text-white p-4 rounded-2xl text-lg mb-4 cursor-pointer'>
          + Nieuw client
        </button>
      </Link>

      {isLoading && (
        <div className='mt-10 text-center'>
          <p className='text-lg'>Client data wordt opgehaald...</p>
          <Loading />
        </div>
      )}

      {!clients && !isLoading && <p>No Clients found</p>}

      {!isLoading && clients && (
        <div className='space-y-3'>
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className='bg-white p-4 rounded-2xl shadow cursor-pointer hover:shadow-md transition'
            >
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-semibold'>{client.name}</p>
                  <p className='text-sm text-gray-500'>{client.status}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    client.status === 'Goedgekeurd'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {client.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
