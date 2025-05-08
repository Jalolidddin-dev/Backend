'use client';

import { registerSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';

function Register() {
  const { setAuth } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
  }
  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'>Register</h1>
        <h4 className='text-sm text-muted-foreground'>
          {' '}
          Already have an account?
          <span
            className='cursor-pointer text-blue-600 hover:underline'
            onClick={() => setAuth('login')}
          >
            Sign In
          </span>
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
          <div className='flex justify-end'>
            <span
              className='text-sm text-blue-600 cursor-pointer hover:underline'
              onClick={() => setAuth('forgot-password')}
            >
              Forgot Password
            </span>
          </div>
          <Button type='submit'>Register</Button>
        </form>
      </Form>
    </>
  );
}

export default Register;
