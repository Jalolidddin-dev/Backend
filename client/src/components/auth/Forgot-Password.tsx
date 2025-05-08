'use client';

import { forgotPasswordSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';

function ForgotPassword() {
  const { setAuth } = useAuth();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log(values);
  }
  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'>Forgot Password</h1>
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
      <Form {...form}>
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

          <Button type='submit' size={'sm'}>
            Send
          </Button>
        </form>
      </Form>
    </>
  );
}

export default ForgotPassword;
