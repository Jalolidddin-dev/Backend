import CardLoading from '@/components/shared/CardLoading';
import ProductCards from '@/components/shared/ProductCards';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import $axios from '@/http';
import { cardStore } from '@/store/card.store';
import { ICard } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

function Home() {
  const { setCards, cards } = cardStore();

  const { isLoading, error } = useQuery({
    queryKey: ['get-cards'],
    queryFn: async () => {
      const { data } = await $axios.get('/card/get');
      setCards(data);
      return data;
    },
  });

  return (
    <div className='container max-w-4xl mx-auto mt-28'>
      {error && (
        <Alert variant={'destructive'}>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <div className='grid grid-cols-3 gap-4'>
        {isLoading &&
          Array.from({ length: 6 }).map((_, idx) => <CardLoading key={idx} />)}
        {cards.map((card: ICard) => (
          <ProductCards key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default Home;
