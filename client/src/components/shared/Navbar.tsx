import { Link } from 'react-router-dom';
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
import { useState } from 'react';

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  console.log(setIsAuth);
  return (
    <div>
      <div className='w-full h-24 bg-gray-900 fixed inset-0'>
        <div className='w-full h-full flex justify-between items-center px-12'>
          <Link
            className='flex items-center justify-center gap-2 text-4xl text-violet-300 ml-2'
            to={'/'}
          >
            .dev
          </Link>
          <ul className='flex gap-4'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <div className='flex gap-2 items-center'>
            <Button
              className='rounded-full font-bold'
              size={'lg'}
              variant={'outline'}
            >
              Create Post
            </Button>

            {/* <Loader2 className='animate-spin' /> */}
            {isAuth ? (
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
                    examle@gmail.com
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
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
    </div>
  );
}

export default Navbar;
