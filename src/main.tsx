import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Skeleton } from '@/components/ui/skeleton'
import { Dashboard } from './pages/Dashboard.tsx'
import { UniverseDefinitionPage } from './pages/UniverseDefinitionPage.tsx'
import { TemplatesPage } from './pages/TemplatesPage.tsx'
import { ServicesPage } from './pages/ServicesPage.tsx'
import { APIKeysPage } from './pages/APIKeysPage.tsx'
import { TeamPage } from './pages/TeamPage.tsx'
import { SubscriptionsPage } from './pages/SubscriptionsPage.tsx'
import { DataDropPage } from './pages/DataDropPage.tsx'
import { HistoricalUploadPage } from './pages/HistoricalUploadPage.tsx'

function PageFallback() {
  return (
    <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-8">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-100 w-full" />
    </div>
  )
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/universe-definition"
              element={<UniverseDefinitionPage />}
            />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/data-drop" element={<DataDropPage />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/api-keys" element={<APIKeysPage />} />
            <Route path="/historical" element={<HistoricalUploadPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
