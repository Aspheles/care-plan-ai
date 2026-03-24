import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GeneratePage from './pages/GeneratePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/generate-page' element={<GeneratePage />} />
      </Routes>
    </BrowserRouter>
  );
}
