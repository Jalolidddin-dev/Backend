'use client';

import { registerSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';
import { authStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import $axios from '@/http';
// import { toast } from 'sonner';
import FillLoading from '../shared/fill-loading.tsx';

function Register() {
  const { setAuth } = useAuth();

  const { setIsAuth, setUser } = authStore();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      userName: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: z.infer<typeof registerSchema>) => {
      const { data } = await $axios.post(`/auth/register`, values);
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
      setIsAuth(true);
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
      // toast(error.response?.data?.massage)
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutate(values);
  }
  return (
    <>
      {isPending && <FillLoading />}
      <div>
        <h1 className='text-2xl text-white font-bold'>Register</h1>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
          <FormField
            control={form.control}
            name='userName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>User Name</FormLabel>
                <FormControl>
                  <Input
                    className='text-white'
                    placeholder='username...'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Email</FormLabel>
                <FormControl>
                  <Input
                    className='text-white'
                    placeholder='email...'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Password</FormLabel>
                <FormControl>
                  <Input
                    className='text-white'
                    placeholder='*****'
                    {...field}
                  />
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
          <Button type='submit' size={'sm'}>
            Register
          </Button>
        </form>
      </Form>
    </>
  );
}

export default Register;
