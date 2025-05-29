import { Skeleton } from '../ui/skeleton';

function CardLoading() {
  return (
    <div className='w-full border rounded-md'>
      <Skeleton className='w-full h-36' />

      <div className='mt-2 px-2'>
        <Skeleton className='w-1/2 h-8 mt-2' />
      </div>
    </div>
  );
}

export default CardLoading;
