import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/LoadingState';
import { type Error, type FormLoginData } from '../types/interface';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>({ state: false, text: '' });

  const navigate = useNavigate();

  const handleLogin = async (
    e: React.ChangeEvent<HTMLFormElement>,
    { username, password }: FormLoginData,
  ) => {
    e.preventDefault();

    if (!username && !password) {
      setError({ state: true, text: 'Voer gebruiksnaam en wachtwoord in' });

      return;
    }

    if (!username) {
      setError({ state: true, text: 'Voer gebruiksnaam in' });

      return;
    }

    if (!password) {
      setError({ state: true, text: 'Voer wachtwoord in' });

      return;
    }

    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 2000));

    setIsLoading(false);

    navigate('/dashboard');
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {!isLoading ? (
        <div className='w-full max-w-md bg-white p-6 rounded-2xl shadow-sm'>
          <h1 className='text-2xl font-bold mb-2 text-center'>Inloggen</h1>

          <p className='text-sm text-gray-500 mb-6 text-center'>Welkom terug</p>

          <LoginForm handleLogin={handleLogin} error={error} />
        </div>
      ) : (
        <Loading text='Logging user in...' />
      )}
    </div>
  );
};

export default Login;
