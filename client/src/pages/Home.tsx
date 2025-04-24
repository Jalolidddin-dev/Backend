import { Route, Routes } from 'react-router-dom';
import Auth from './Auth';

function Home() {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default Home;
