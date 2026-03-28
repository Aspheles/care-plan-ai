interface ClientCardProps {
  name: string;
  status: string;
}

export const ClientCard = ({ name, status }: ClientCardProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <p className='font-semibold'>{name}</p>
        <p className='text-sm text-gray-500'>{status}</p>
      </div>
      <span
        className={`text-sm px-3 py-1 rounded-full ${
          status === 'Goedgekeurd'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {status}
      </span>
    </div>
  );
};
