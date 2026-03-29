import Editable from '../ui/Editable';
import Button from '../ui/Button';
import { useState } from 'react';
import { type Error, type FormLoginData } from '../../types/interface';

interface LoginFormProps {
  handleLogin: (
    event: React.ChangeEvent<HTMLFormElement>,
    data: FormLoginData,
  ) => void;

  error: Error;
}

const LoginForm = ({ handleLogin, error }: LoginFormProps) => {
  const [formData, setFormData] = useState<FormLoginData>({
    username: '',
    password: '',
  });

  return (
    <form
      onSubmit={(event) => handleLogin(event, { ...formData })}
      className='space-y-4'
    >
      <div>
        <Editable
          name='email'
          type='text'
          placeholder='E-mailadres of Gebruiksnaam'
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className='w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <Editable
          name='password'
          type='password'
          placeholder='Wachtwoord'
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className='w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {error.state && <p className='text-red-500'>* {error.text}</p>}

      <Button
        type='submit'
        className='w-full bg-blue-600 text-white p-3 rounded-xl cursor-pointer'
      >
        Inloggen
      </Button>
    </form>
  );
};

export default LoginForm;
