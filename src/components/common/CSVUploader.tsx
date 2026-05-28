import { Button } from '@/components/ui/button'
import { useCallback, useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'
import Papa from 'papaparse'

type CSVUploaderProps = {
  disabled?: boolean
  label?: string
  icon?: React.ReactNode
}

type UploadedFile = {
  id: number
  name: string
  size: string
  rows: number
  columns: string[]
  data: any[]
}

export function CSVUploader({
  disabled = false,
  label = '',
  icon,
}: CSVUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [showModal, setShowModal] = useState(false)

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) return

    Array.from(files).forEach((file, index) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,

        complete: (results) => {
          const parsedFile: UploadedFile = {
            id: Date.now() + index,
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            rows: results.data.length,
            columns: results.meta.fields || [],
            data: results.data,
          }

          setUploadedFiles((prev) => [...prev, parsedFile])
          setShowModal(true)
        },

        error: (error) => {
          console.error('CSV Parse Error:', error)
        },
      })
    })

    // Reset input so same file can be uploaded again
    event.target.value = ''
  }

  const handleCloseModel = useCallback(() => {
    setShowModal(false)
    setUploadedFiles([])
  }, [])

  return (
    <div>
      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        multiple
        hidden
        onChange={handleFilesChange}
      />
      <Button
        onClick={handleUploadClick}
        disabled={disabled}
        variant="default"
        size="default"
        className="gap-2 cursor-pointer py-5 px-3 font-normal"
      >
        {icon}
        {label}
      </Button>
      {showModal && (
        <UploadedFilesModal
          uploadedFiles={uploadedFiles}
          onClose={handleCloseModel}
        />
      )}
    </div>
  )
}

type UploadedFilesModalProps = {
  uploadedFiles: UploadedFile[]
  onClose: () => void
}

export const UploadedFilesModal = ({
  uploadedFiles,
  onClose,
}: UploadedFilesModalProps) => {
  const uploadedColumns = ['File Name', 'Size', 'Rows', 'Review', '']
  const handleReviewChanges = useCallback((fileId: number) => {
    // Implement review changes logic here
    console.log('Reviewing changes for file ID:', fileId)
  }, [])

  const handleDeleteFile = useCallback((fileId: number) => {
    // Implement delete file logic here
    console.log('Deleting file ID:', fileId)
  }, [])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Uploaded CSV Files</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 transition hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {uploadedColumns.map((column) => (
                <th
                  key={column}
                  className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {uploadedFiles.map((file) => (
              <tr key={file.id}>
                <td className="border-b px-4 py-3 text-sm">{file.name}</td>

                <td className="border-b px-4 py-3 text-sm">{file.size}</td>

                <td className="border-b px-4 py-3 text-sm">{file.rows}</td>

                <td className="border-b px-4 py-3 text-sm">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleReviewChanges(file.id)}
                  >
                    Review Changes
                  </Button>
                </td>
                <td className="border-b px-4 py-3 text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {uploadedFiles.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            No CSV files uploaded yet.
          </p>
        )}
      </div>
    </div>
  )
}
