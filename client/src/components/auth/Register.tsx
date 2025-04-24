'use client';

import { registerSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

function Register() {
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
    <div className='mt-24 w-72'>
      <div>
        <h1>Register</h1>
        <h4>
          {' '}
          Already have an account?
          <Link to={'/login'}>Sign In</Link>
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
            <Link to={'/forgot-password'}>Forgot Password</Link>
          </div>
          <Button type='submit'>Register</Button>
        </form>
      </Form>
    </div>
  );
}

export default Register;
