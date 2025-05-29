import { ICard } from '@/types';
import { create } from 'zustand';

type CardStoreType = {
  cards: ICard[];
  setCards: (posts: ICard[]) => void;
};

export const cardStore = create<CardStoreType>((set) => ({
  cards: [],
  setCards: (cards) => set({ cards }),
}));
