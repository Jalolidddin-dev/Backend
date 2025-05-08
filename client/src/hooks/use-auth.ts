import { AuthType } from '../../types'
import { create } from 'zustand'

type AuthStore = {
  authStata: AuthType,
  setAuth: (state: AuthType) => void,
}

export const useAuth = create<AuthStore>(set => ({
  authStata: 'login',
  setAuth: (state) => set(() => ({ authStata: state })),
}))

