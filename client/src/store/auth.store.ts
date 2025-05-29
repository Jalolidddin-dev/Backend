import { IUser } from '@/types';
import { create } from 'zustand';

type AuthStoreType = {
  isLoading: boolean;
  isAuth: boolean;
  data: IUser;
  setUser: (data: IUser) => void;
  setLoading: (bool: boolean) => void;
  setIsAuth: (bool: boolean) => void;
};

export const authStore = create<AuthStoreType>((set) => ({
  isLoading: false,
  isAuth: true,
  data: {} as IUser,
  setUser: (data) => set({ data }),
  setLoading: (bool) => set({ isLoading: bool }),
  setIsAuth: (bool) => set({ isAuth: bool }),
}));
