import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/shared/Navbar';

import Auth from './pages/Auth';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
