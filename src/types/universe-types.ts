export type UniverseDefinitionEntry = {
  id: string
  date: string
  service: string
  region: string
  submittedBy: string
  asset?: string
  type?: string
  status?: string
}

export type UniverseDefinitionFilterOptions = {
  name?: string
  service?: string
  region?: string
  asset?: string
  type?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}

export const SERVICES = [
  'equity_vanilla_option',
  'equity_barrier_option',
  'equity_forward_inf',
  'equity_forward',
  'equity_swap_lsn',
] as const

export const REGIONS = ['HKG', 'LDN', 'SGP', 'TYO', 'NYC', 'CHI'] as const
export const ASSETS = ['equity', 'fx', 'credit', 'commodity', 'ir'] as const
export const TYPES = ['vanilla', 'barrier', 'exotic', 'structured', 'forward'] as const
export const STATUSES = ['active', 'pending', 'archived', 'inactive'] as const

export type Services = typeof SERVICES[number] 
export type Regions = typeof REGIONS[number] 
export type Assets = typeof ASSETS[number] 
export type Types = typeof TYPES[number] 
export type Statuses = typeof STATUSES[number] 