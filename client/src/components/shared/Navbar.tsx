import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
// import { Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { authStore } from '@/store/auth.store';
import $axios from '@/http';
import { IUser } from '@/types';
import { useCreatePost } from '@/hooks/use-create-post';
import CreateCard from '../create-card';
import { Loader2 } from 'lucide-react';

function Navbar() {
  const { onOpen } = useCreatePost();

  const { isAuth, setIsAuth, data, isLoading, setUser } = authStore();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await $axios.post('/auth/logout');
      setIsAuth(false);
      setUser({} as IUser);
      navigate('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-full h-24 bg-gray-900 fixed inset-0'>
        <div className='w-full h-full flex justify-between items-center px-12'>
          <Link
            className='flex items-center justify-center gap-2 text-4xl text-violet-300 ml-2'
            to={'/'}
          >
            .dev
          </Link>

          <div className='flex gap-2 items-center'>
            {isAuth && (
              <Button
                className='rounded-full font-bold'
                size={'lg'}
                variant={'outline'}
                onClick={onOpen}
              >
                Create Card
              </Button>
            )}
            {isLoading ? (
              <Loader2 className='animate-spin' />
            ) : isAuth ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <p className='text-sm text-red-400 text-center'>
                    User is not activated
                  </p>
                  <DropdownMenuLabel className='line-clamp-1'>
                    {data.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={'/auth'}>
                <Button size={'lg'} className='rounded-full font-bold'>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <CreateCard />
    </>
  );
}

export default Navbar;
