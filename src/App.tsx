import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GeneratePage from './pages/GeneratePage';
import Login from './pages/Login';
import Layout from './components/layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/generate-page' element={<GeneratePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
