import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ASSETS,
  REGIONS,
  SERVICES,
  STATUSES,
  TYPES,
  type Assets,
  type Regions,
  type Services,
  type Statuses,
  type Types,
} from '@/types/universe-types'
import { useUniverseStore } from '@/store/universeStore'
import { DateRangeFilter } from './DateRangeFilter'

export const UniverseFilters = () => {
  const {
    filterName,
    filterService,
    filterRegion,
    filterAsset,
    filterType,
    filterStatus,
    setFilterName,
    setFilterService,
    setFilterRegion,
    setFilterAsset,
    setFilterType,
    setFilterStatus,
  } = useUniverseStore()

  const filterList = [
    {
      key: 'Asset',
      value: filterAsset,
      options: ASSETS,
      onChange: (value: unknown) => setFilterAsset(value as Assets),
      defaultValue: 'Asset',
    },
    {
      key: 'Region',
      value: filterRegion,
      options: REGIONS,
      onChange: (value: unknown) => setFilterRegion(value as Regions),
      defaultValue: 'Region',
    },
    {
      key: 'Service',
      value: filterService,
      options: SERVICES,
      onChange: (value: unknown) => setFilterService(value as Services),
      defaultValue: 'Service',
    },
    {
      key: 'Type',
      value: filterType,
      options: TYPES,
      onChange: (value: unknown) => setFilterType(value as Types),
      defaultValue: 'Type',
    },
    {
      key: 'Status',
      value: filterStatus,
      options: STATUSES,
      onChange: (value: unknown) => setFilterStatus(value as Statuses),
      defaultValue: 'Status',
    },
  ]

  return (
    <div className="px-6 w-full">
      <div className="flex justify-between gap-4 w-full">
        <div className="flex flex-col gap-1">
          <Input
            placeholder="Filter name"
            value={filterName}
            onChange={(e) => {
              setFilterName(e.target.value)
            }}
            className="h-9 max-w-md min-w-54 w-full"
          />
        </div>

        <div className="flex gap-5 w-full justify-end">
          {filterList.map(({ key, value, options, onChange, defaultValue }) => (
            <div key={key}>
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder={defaultValue} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{defaultValue}</SelectItem>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <DateRangeFilter />
        </div>
      </div>
    </div>
  )
}
