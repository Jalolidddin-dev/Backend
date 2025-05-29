import { ICard } from '@/types';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cardStore } from '@/store/card.store';
import { useConfirm } from '@/hooks/use-confirm';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { cardSchema } from '@/lib/validation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import $axios from '@/http';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import FillLoading from './fill-loading';

function ProductCards({ card }: { card: ICard }) {
  const [open, setOpen] = useState(false);
  const { cards, setCards } = cardStore();
  const { onOpen, setCard } = useConfirm();
  const onDelete = () => {
    onOpen();
    setCard(card);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: z.infer<typeof cardSchema>) => {
      const { data } = await $axios.put(`/card/edit/${card._id}`, values);
      return data;
    },
    onSuccess: (data) => {
      const newData = cards.map((c) => (c._id === data._id ? data : c));
      setCards(newData);
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      // toast(error.response?.data?.massage)
    },
  });

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      body: card.body,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof cardSchema>) {
    mutate(values);
  }

  return (
    <div>
      <Card>
        <CardContent>
          <h3>{card.body}</h3>
        </CardContent>
        <CardFooter className='g-2'>
          <Button variant={'destructive'} onClick={onDelete}>
            Delete
          </Button>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button>Edit</Button>
            </PopoverTrigger>
            <PopoverContent className='w-96 relative'>
              {isPending && <FillLoading />}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <FormField
                    control={form.control}
                    name='body'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <Input placeholder='body...' {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Submit</Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductCards;
