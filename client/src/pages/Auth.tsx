import ForgotPassword from '@/components/auth/Forgot-Password';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';

export default function Auth() {
  const { authStata } = useAuth();

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card className='w-1/3 p-3 bg-gray-900 relative'>
        <CardContent>
          {authStata === 'login' && <Login />}
          {authStata === 'register' && <Register />}
          {authStata === 'forgot-password' && <ForgotPassword />}
        </CardContent>
      </Card>
    </div>
  );
}
