import type { UniverseDefinitionEntry, UniverseDefinitionFilterOptions } from '@/types/universe-types'
import { generateUniverseDefinitionData } from '@/lib/universe-mock-data'

const NETWORK_DELAY_MS = 350

function delay<T>(value: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export async function fetchUniverseDefinition(
  filterOptions?: UniverseDefinitionFilterOptions,  
): Promise<UniverseDefinitionEntry[]> {
  return delay(generateUniverseDefinitionData(filterOptions))
}