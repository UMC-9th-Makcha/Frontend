import { create } from 'zustand';
import type { ViewType } from '../pages/Setting/constants';
import type { Place } from '../types/setting';

interface SettingState {
  home: Place | null;
  favorites: Place[];
  selectedTimes: string[];
  view: ViewType;
  
  setHome: (place: Place) => void;
  setFavorites: (favorites: Place[]) => void;
  setSelectedTimes: (times: string[]) => void;
  toggleTime: (time: string, dragMoved: boolean) => void;
  setView: (view: ViewType) => void;
}

export const useSettingStore = create<SettingState>((set) => ({
  home: null,
  favorites: [],
  selectedTimes: ['10분'],
  view: 'MAIN' as ViewType,

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
}));