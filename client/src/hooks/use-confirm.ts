import { ICard } from '@/types';
import { create } from 'zustand';

type ConfirmStore = {
  isOpen: boolean;
  card: ICard;
  onOpen: () => void;
  onClose: () => void;
  setCard: (card: ICard) => void;
};

export const useConfirm = create<ConfirmStore>((set) => ({
  isOpen: false,
  card: {} as ICard,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCard: (card) => set({ card }),
}));
