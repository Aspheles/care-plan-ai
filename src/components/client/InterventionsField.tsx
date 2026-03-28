import Editable from '../../components/ui/Editable';
import Button from '../../components/ui/Button';
import { MdDeleteOutline, MdOutlineAddCircle } from 'react-icons/md';
import { type Intervention } from '../../types/interface';

interface InterventionsFieldProps {
  interventions: Intervention[];
  onChange: (updated: Intervention[]) => void;
}

const InterventionsField = ({
  interventions,
  onChange,
}: InterventionsFieldProps) => {
  const handleChange = (id: number, value: string) => {
    onChange(
      interventions.map((item) =>
        item.id === id ? { ...item, description: value } : item,
      ),
    );
  };

  const addIntervention = () => {
    onChange([
      ...interventions,
      {
        id: Math.floor(Math.random() * 1000),
        description: '',
      },
    ]);
  };

  const removeIntervention = (id: number) => {
    onChange(interventions.filter((i) => i.id !== id));
  };

  return (
    <>
      {interventions.map((item) => (
        <div key={item.id} className='flex items-center gap-3 mt-2 w-full'>
          <Editable
            name='intervention'
            value={item.description}
            onChange={(event) => handleChange(item.id, event.target.value)}
          />

          <Button
            onClick={() => removeIntervention(item.id)}
            type='button'
            className='p-2 bg-red-500 text-white hover:scale-125 transition-transform duration-150 cursor-pointer'
          >
            <MdDeleteOutline size={23} />
          </Button>
        </div>
      ))}

      <Button
        onClick={addIntervention}
        className='cursor-pointer bg-blue-500 mt-4 ml-1 p-2 text-white hover:scale-125 transition duration-300'
        type='button'
      >
        <MdOutlineAddCircle size={25} />
      </Button>
    </>
  );
};

export default InterventionsField;
