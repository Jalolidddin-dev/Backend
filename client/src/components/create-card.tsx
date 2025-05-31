import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCreatePost } from '@/hooks/use-create-post';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cardSchema } from '@/lib/validation';
import $api from '@/http/api';
import { cardStore } from '@/store/card.store';
import { ChangeEvent, useState } from 'react';
import { Textarea } from './ui/textarea';

function CreateCard() {
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState<File | null>(null);
  const { isOpen, onClose } = useCreatePost();

  const { cards, setCards } = cardStore();

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      body: '',
      picture: '',
      describtion: '',
    },
  });

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setPicture(file as File);
  };

  async function onSubmit(values: z.infer<typeof cardSchema>) {
    if (!picture) return null;
    setLoading(true);
    const formData = new FormData();
    formData.append('body', values.body);
    formData.append('picture', picture);
    formData.append('describtion', values.describtion);
    try {
      const res = await $api.post('/card/create', formData);
      const newData = [...cards, res.data];
      setCards(newData);
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Card</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-2 mt-6'
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='picture'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      placeholder='picture...'
                      {...field}
                      onChange={onFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='describtion'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describtion</FormLabel>
                  <FormControl>
                    <Textarea
                      className='bg-secondary outline-0'
                      placeholder='describtion...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default CreateCard;
