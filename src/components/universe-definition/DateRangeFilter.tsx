import * as React from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useUniverseStore } from '@/store/universeStore'
import { useCallback } from 'react'

type DateRange = {
  from: Date
  to?: Date
}

export function DateRangeFilter() {
  const { setFilterDateRange } = useUniverseStore()
  const [range, setRange] = React.useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Default to one week range
    to: new Date(Date.now()), // Default to one week range
  })

  const handleSelectDateRange = useCallback(
    (selectedRange: DateRange) => {
      setRange(selectedRange)
      setFilterDateRange({
        from: selectedRange.from,
        to: selectedRange.to,
      })
    },
    [setFilterDateRange],
  )

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="w-fit justify-end">
          {range.from ? (
            range.to ? (
              <>
                {format(range.from, 'LLL dd, y')} -{' '}
                {format(range.to, 'LLL dd, y')}
              </>
            ) : (
              format(range.from, 'LLL dd, y')
            )
          ) : (
            'Pick a date range'
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-0" align="start">
        <Calendar
          mode="range"
          selected={range as DateRange}
          onSelect={(selectedRange) =>
            handleSelectDateRange(selectedRange as DateRange)
          }
          numberOfMonths={1}
          disabled={(date) => date > new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
