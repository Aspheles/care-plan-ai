import type { Client } from '../../types/interface';
import { ClientCard } from './ClientCard';

interface ClientCardProps {
  clients: Client[];
  updateSelectedClient: (client: Client) => void;
}

export const ClientList = ({
  clients,
  updateSelectedClient,
}: ClientCardProps) => {
  return (
    <div className='space-y-3'>
      {clients.map((client) => (
        <div
          key={client.id}
          onClick={() => updateSelectedClient(client)}
          className='bg-white p-4 rounded-2xl shadow cursor-pointer hover:shadow-md transition'
        >
          <ClientCard {...client} />
        </div>
      ))}
    </div>
  );
};
