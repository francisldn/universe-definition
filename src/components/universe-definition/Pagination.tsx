import { useCallback } from 'react'
import { Button } from '../ui/button'

interface PaginationProps {
  gridApiRef: React.RefObject<any>
  currentPage: number
  totalPages: number
  updatePagination: (paginationSize: number) => void
  paginationSize: number
  setPaginationSize: (size: number) => void
}

export const Pagination = ({
  gridApiRef,
  currentPage,
  totalPages,
  updatePagination,
  paginationSize,
  setPaginationSize,
}: PaginationProps) => {
  const goToNextPage = useCallback(() => {
    const gridApi = gridApiRef.current
    if (!gridApi) return
    gridApi.paginationGoToNextPage()
    updatePagination(paginationSize)
  }, [gridApiRef, paginationSize])

  const goToPreviousPage = useCallback(() => {
    const gridApi = gridApiRef.current
    if (!gridApi) return
    gridApi.paginationGoToPreviousPage()
    updatePagination(paginationSize)
  }, [gridApiRef, paginationSize])

  const selectPaginationSize = useCallback(
    (size: number) => {
      setPaginationSize(size)
      updatePagination(size)
    },
    [gridApiRef, setPaginationSize, updatePagination],
  )

  const paginationOptions = [10, 20, 30, 50]

  return (
    <div className="mt-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <select
          value={paginationSize}
          onChange={(e) => selectPaginationSize(Number(e.target.value))}
        >
          {paginationOptions.map((option) => (
            <option key={option} value={option} className="text-sm">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={goToPreviousPage}
          className="rounded  px-3 py-1"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={goToNextPage}
          className="rounded  px-3 py-1"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
