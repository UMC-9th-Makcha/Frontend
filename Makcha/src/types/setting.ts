export interface AlarmState {
    selectedTimes: string[];
    isLoading: boolean;
  
    fetchSettings: () => Promise<void>;
    toggleTime: (timeLabel: string) => Promise<void>;
    resetSettings: () => void;
  }