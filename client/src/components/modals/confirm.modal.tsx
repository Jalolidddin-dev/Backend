import { useConfirm } from '@/hooks/use-confirm';
import { cardStore } from '@/store/card.store';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import FillLoading from '../shared/fill-loading';
import $api from '@/http/api';

function ConfirmModal() {
  const { isOpen, onClose, card } = useConfirm();
  const { setCards, cards } = cardStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-card'],
    mutationFn: async () => {
      const { data } = await $api.delete(`/card/delete/${card._id}`);
      return data;
    },
    onSuccess: (data) => {
      const newCard = cards.filter((c) => c._id !== data._id);
      setCards(newCard);
      onClose();
    },
    onError: (error) => {
      console.log(error);
      // toast(error.response?.data?.massage)
    },
  });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          {isPending && <FillLoading />}
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant={'destructive'} onClick={onClose}>
              Cencel
            </Button>
            <Button variant={'default'} onClick={() => mutate()}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConfirmModal;
