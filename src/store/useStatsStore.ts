import { StatsPeriod, StatsResponse } from "@/types/stats";
import { create } from "zustand";

interface StatsState {
  period: StatsPeriod;
  stats: StatsResponse | null;
  isLoading: boolean;
  error: string | null;
  setPeriod: (period: StatsPeriod) => void;
  loadStats: (period?: StatsPeriod) => Promise<void>;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  period: "today",
  stats: null,
  isLoading: false,
  error: null,

  setPeriod: (period) => set({ period }),

  loadStats: async (period) => {
    const selectedPeriod = period || get().period;
    set({ isLoading: true, error: null });

    try {
      const statsReponse = await fetch(period ? `/api/stats?period=${period}` : `/api/stats`);
      if (!statsReponse.ok) {
        throw new Error("Erreur lors de la récupération des statistiques");
      }
      const stats: StatsResponse = await statsReponse.json(); // 🔥 Convertir en JSON

      set({ stats, period: selectedPeriod, isLoading: false });


    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Erreur inconnue", isLoading: false });
    }
  },




}));
