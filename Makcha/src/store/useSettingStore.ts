import { create } from 'zustand';
import type { ViewType } from '../pages/Setting/constants';
import type { Place } from '../pages/Setting/types/setting';

interface SettingState {
  home: Place;
  favorites: Place[];
  selectedTimes: string[];
  view: ViewType;
  setHome: (place: Place) => void;
  setFavorites: (favorites: Place[]) => void;
  setSelectedTimes: (times: string[]) => void;
  setView: (view: ViewType) => void;
  toggleTime: (time: string, dragMoved: boolean) => void;
  savePlace: (updated: Place) => void;
  deleteFavorite: (id: string) => void;
}

export const useSettingStore = create<SettingState>((set) => ({
  home: { id: 'home', name: '집', address: '', detail: '' },
  favorites: [],
  selectedTimes: ['10분 전'],
  view: 'MAIN',

  setHome: (home) => set({ home }),
  setFavorites: (favorites) => set({ favorites }),
  setSelectedTimes: (selectedTimes) => set({ selectedTimes }),
  setView: (view) => set({ view }),

  toggleTime: (time, dragMoved) => {
    if (dragMoved) return;
    set((state) => ({
      selectedTimes: state.selectedTimes.includes(time)
        ? state.selectedTimes.filter((t) => t !== time)
        : [...state.selectedTimes, time],
    }));
  },

  savePlace: (updated) => {
    set((state) => {
      if (updated.id === 'home') return { home: updated };

      const isExisting = state.favorites.some((p) => p.id === updated.id);
      return {
        favorites: isExisting
          ? state.favorites.map((p) => (p.id === updated.id ? updated : p))
          : [...state.favorites, updated],
      };
    });
  },

  deleteFavorite: (id) => {
    if (id === 'home') return;
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== id),
    }));
  },
}));