import React from 'react';
import logo from '../../assets/logo.png';
import Button from '../ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className='w-full'>
      <div className='max-w-full px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex justify-between'>
          <div className='flex items-start '>
            <img src={logo} className='w-18 mr-2' />
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
              {subtitle && (
                <p className='text-sm text-gray-600 mt-1 text-center'>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {location.pathname.includes('dashboard') && (
            <div className='flex'>
              <Button
                onClick={() => navigate('/')}
                className='flex items-center gap-2 text-black p-3 rounded-xl  transition cursor-pointer hover:text-blue-600'
              >
                <IoMdLogOut size={20} />
                Uitloggen
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
