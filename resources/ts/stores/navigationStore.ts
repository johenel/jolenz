import { create } from 'zustand/react'

type NavigationState = {
    searchOpen: boolean
    searchQuery: string

    /** TEMP FLAG – toggle to test UI */
    isAuthenticated: boolean

    openSearch: () => void
    closeSearch: () => void
    setSearchQuery: (value: string) => void
    toggleAuth: () => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
    searchOpen: false,
    searchQuery: '',
    isAuthenticated: false, // 👈 toggle this manually for now

    openSearch: () => set({ searchOpen: true }),
    closeSearch: () => set({ searchOpen: false, searchQuery: '' }),
    setSearchQuery: (value) => set({ searchQuery: value }),
    toggleAuth: () =>
        set((state) => ({ isAuthenticated: !state.isAuthenticated })),
}))
