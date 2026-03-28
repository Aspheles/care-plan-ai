import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Editable from '../components/ui/Editable';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('Admin');
  const [password, setPassword] = useState('Admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    navigate('/dashboard');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-2xl shadow-sm'>
        <h1 className='text-2xl font-bold mb-2 text-center'>Inloggen</h1>

        <p className='text-sm text-gray-500 mb-6 text-center'>Welkom terug</p>

        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <Editable
              name='email'
              type='text'
              placeholder='E-mailadres of Gebruiksnaam'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <Editable
              name='password'
              type='password'
              placeholder='Wachtwoord'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-blue-600 text-white p-3 rounded-xl cursor-pointer'
          >
            Inloggen
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
