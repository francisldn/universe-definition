import { useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef, GridApi } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { type UniverseDefinitionEntry } from '@/types/universe-types'
import { Header } from '@/components/common/Header'
import { Layout } from '@/components/common/Layout'
import { CSVUploader } from '@/components/common/CSVUploader'
import { Download, Upload } from 'lucide-react'
import { UniverseFilters } from '@/components/universe-definition/UniverseFilters'
import { useUniverseStore } from '@/store/universeStore'
import { useUniverseDefinitionData } from '@/hooks/hooks'
import { Skeleton } from '@/components/ui/skeleton'
import { isValidDate } from '@/utils/utils'
import { Pagination } from '@/components/universe-definition/Pagination'

ModuleRegistry.registerModules([AllCommunityModule])

export function UniverseDefinitionPage() {
  const gridApiRef = useRef<GridApi<UniverseDefinitionEntry> | null>(null)
  const {
    filterName,
    filterService,
    filterRegion,
    filterAsset,
    filterType,
    filterStatus,
    filterDateRange,
  } = useUniverseStore()
  const { data, isLoading, error } = useUniverseDefinitionData({
    name: filterName,
    service: filterService,
    region: filterRegion,
    asset: filterAsset,
    type: filterType,
    status: filterStatus,
    dateFrom:
      filterDateRange.from && isValidDate(filterDateRange.from)
        ? new Date(filterDateRange.from).toISOString()
        : undefined,
    dateTo:
      filterDateRange.to && isValidDate(filterDateRange.to)
        ? new Date(filterDateRange.to).toISOString()
        : undefined,
  }) // Fetch data using custom hook
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [paginationSize, setPaginationSize] = useState(20)
  const updatePagination = (paginationSize: number) => {
    const gridApi = gridApiRef.current
    if (!gridApi) return
    setCurrentPage(() => gridApi.paginationGetCurrentPage() + 1)
    setTotalPages(() =>
      data?.length ? Math.ceil(data.length / paginationSize) : 1,
    )
  }

  const columnDefs: ColDef[] = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 40,
      pinned: 'left' as const,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 100,
    },
    {
      field: 'service',
      headerName: 'Service',
      width: 160,
      flex: 1,
    },
    {
      field: 'region',
      headerName: 'Region',
      width: 100,
    },
    {
      field: 'submittedBy',
      headerName: 'Submitted by',
      width: 140,
      flex: 1,
    },
    {
      headerName: 'SUD',
      width: 120,
      pinned: 'right' as const,
      cellRenderer: (_) => {
        return (
          <div className="flex  gap-2">
            <div className="p-1 rounded-md cursor-pointer">
              <Download className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="bg-black p-1 rounded cursor-pointer">
              <Upload className="h-4 w-4 text-white bg-black" />
            </div>
          </div>
        )
      },
    },
    {
      field: 'asset',
      headerName: 'Asset',
      width: 100,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      hide: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      hide: true,
    },
  ]

  return (
    <Layout>
      <div className="flex flex-col gap-6 py-4 w-full">
        <div className="flex justify-between items-center w-full border-b border-border bg-background pb-4 px-6">
          <Header title="Universe Definition" />
          <CSVUploader
            icon={<Upload className="h-4 w-4" />}
            label="Upload new version(s)"
          />
        </div>
        <UniverseFilters />
        <div className="px-6 w-full">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-md" />
          ) : (
            <div
              className="ag-theme-quartz"
              style={{ height: '400px', width: '100%' }}
            >
              <AgGridReact<UniverseDefinitionEntry>
                rowData={data}
                columnDefs={columnDefs}
                onGridReady={(params) => {
                  gridApiRef.current = params.api
                  updatePagination(paginationSize)
                }}
                pagination={true}
                paginationPageSize={paginationSize}
                suppressPaginationPanel={true}
                domLayout="normal"
                suppressMovableColumns={true}
                rowSelection="multiple"
              />
              <Pagination
                gridApiRef={gridApiRef}
                currentPage={currentPage}
                totalPages={totalPages}
                updatePagination={updatePagination}
                paginationSize={paginationSize}
                setPaginationSize={setPaginationSize}
              />
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-4">
              Error loading data: {error.message}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
