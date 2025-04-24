import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/shared/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/Forgot-Password';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
