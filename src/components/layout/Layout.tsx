import React, { type ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <Header title='Zorgplannen' subtitle='Zorgen voor elkaar' />
      {children}
    </div>
  );
};

export default Layout;
