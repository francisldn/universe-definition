import type { ReactNode } from 'react'
import { Sidebar } from '@/components/common/Sidebar'
import { TopNavigation } from '@/components/common/TopNavigation'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="w-full">
        <TopNavigation />
        {children}
      </main>
    </div>
  )
}
