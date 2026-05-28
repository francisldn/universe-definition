import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Assets,
  Regions,
  Services,
  Statuses,
  Types,
} from '@/types/universe-types'

interface UniverseFilters {
  filterName: string
  filterService: Services
  filterRegion: Regions
  filterAsset: Assets
  filterType: Types
  filterStatus: Statuses
  filterDateRange: {
    from?: Date | null;
    to?: Date | null;
  }
}

interface UniverseStore extends UniverseFilters {
  setFilterName: (name: string) => void
  setFilterService: (service: Services) => void
  setFilterRegion: (region: Regions) => void
  setFilterAsset: (asset: Assets) => void
  setFilterType: (type: Types) => void
  setFilterStatus: (status: Statuses) => void
  setFilterDateRange: (dateRange: { from?: Date | null; to?: Date | null }) => void
  resetFilters: () => void
}

const initialState: UniverseFilters = {
  filterName: '',
  filterService: '' as Services,
  filterRegion: '' as Regions,
  filterAsset: '' as Assets,
  filterType: '' as Types,
  filterStatus: '' as Statuses,
  filterDateRange: {
    from: null,
    to: null
  },
}

export const useUniverseStore = create<UniverseStore>()(persist((set) => ({
  ...initialState,
  setFilterName: (name: string) => set({ filterName: name }),
  setFilterService: (service: Services) => set({ filterService: service }),
  setFilterRegion: (region: Regions) => set({ filterRegion: region }),
  setFilterAsset: (asset: Assets) => set({ filterAsset: asset }),
  setFilterType: (type: Types) => set({ filterType: type }),
  setFilterStatus: (status: Statuses) => set({ filterStatus: status }),
  setFilterDateRange: (dateRange: { from?: Date | null; to?: Date | null }) => set({ filterDateRange: dateRange }),
  resetFilters: () => set(initialState),
}), {
  name: 'universe-filters',
}))
