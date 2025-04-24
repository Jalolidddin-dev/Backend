'use client';

import { loginSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

function Login() {
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
    <div className='mt-24 w-72'>
      <div>
        <h1>Login</h1>
        <h4>
          Don't have an account?
          <Link to={'/register'}>Sign up</Link>
        </h4>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
            <Link to={'/forgot-password'}>Forgot Password</Link>
          </div>
          <Button type='submit'>Login</Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
