import type { UniverseDefinitionEntry, UniverseDefinitionFilterOptions } from '../types/universe-types'

const SERVICES = [
  'equity_vanilla_option',
  'equity_barrier_option',
  'equity_forward_inf',
  'equity_forward',
  'equity_swap_lsn',
]

const REGIONS = ['HKG', 'LDN', 'SGP', 'TYO', 'NYC', 'CHI']

const CONTRIBUTORS = [
  'Theodore Duncan',
  'Samira Khan',
  'Declan O\'Connell',
  'Zoya Kapoor',
  'Jasper Klein',
  'Niamh Mori',
  'Evelyn Hayes',
  'Marcus Chen',
  'Sofia Rodriguez',
  'James Patterson',
]

//const ASSETS = ['equity', 'fx', 'credit', 'commodity', 'ir']
const TYPES = ['vanilla', 'barrier', 'exotic', 'structured', 'forward']
const STATUSES = ['active', 'pending', 'archived', 'inactive']

function generateRandomDate(daysAgo: number): string {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  return date.toISOString().split('T')[0]
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function filterUniverseDefinition(
  data: UniverseDefinitionEntry[],
  filters: UniverseDefinitionFilterOptions,
): UniverseDefinitionEntry[] {
  return data.filter((entry) => {
    const matchesName = filters.name ? entry.service.toLowerCase().includes(filters.name.toLowerCase()) : true
    const matchesService = filters.service ? entry.service === filters.service : true
    const matchesRegion = filters.region ? entry.region === filters.region : true
    const matchesAsset = filters.asset ? entry.asset === filters.asset : true
    const matchesType = filters.type ? entry.type === filters.type : true
    const matchesStatus = filters.status ? entry.status === filters.status : true
    const matchesDateFrom = filters.dateFrom ? new Date(entry.date) >= new Date(filters.dateFrom) : true
    const matchesDateTo = filters.dateTo ? new Date(entry.date) <= new Date(filters.dateTo) : true
    console.log('matchesDateFrom', matchesDateFrom, 'matchesDateTo', matchesDateTo, 'entry.date', entry.date, 'filters.dateFrom', filters.dateFrom, 'filters.dateTo', filters.dateTo)
    return (
      matchesName &&
      matchesService &&
      matchesRegion &&
      matchesAsset &&
      matchesType &&
      matchesStatus &&
      matchesDateFrom &&
      matchesDateTo 
    )
  })
}

export function generateUniverseDefinitionData(filterOptions?: UniverseDefinitionFilterOptions): UniverseDefinitionEntry[] {
  const data: UniverseDefinitionEntry[] = []

  for (let i = 0; i < 100; i++) {
    data.push({
      id: `universe-${i}`,
      date: generateRandomDate(90),
      service: getRandomItem(SERVICES),
      region: getRandomItem(REGIONS),
      submittedBy: getRandomItem(CONTRIBUTORS),
      asset: 'equity',
      type: getRandomItem(TYPES),
      status: getRandomItem(STATUSES),
    })
  }

  const filteredData = filterUniverseDefinition(data, filterOptions || {})
  // Sort by date descending (most recent first)
  return filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
