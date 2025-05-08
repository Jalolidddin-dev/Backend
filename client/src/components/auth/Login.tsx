'use client';

import { loginSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';

function Login() {
  const { setAuth } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }
  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'>Login</h1>
        <h4 className='text-sm text-muted-foreground'>
          Don't have an account?
          <span
            className='cursor-pointer text-blue-600 hover:underline'
            onClick={() => setAuth('register')}
          >
            Sign up
          </span>
        </h4>
      </div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='example@gmail.com' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='*****' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex justify-end mt-2'>
            <span className='text-sm text-blue-600 cursor-pointer hover:underline' onClick={() => setAuth('forgot-password')}>
              Forgot Password
            </span>
          </div>
          <Button type='submit'>Login</Button>
        </form>
      </Form>
    </>
  );
}

export default Login;
