import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, PanelLeft } from 'lucide-react'
import { formatBreadCrumbLabel } from '@/utils/utils'

const ROUTE_LABELS: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/templates': 'Templates',
  '/services': 'Services',
  '/universe-definition': 'Universe Definition',
  '/subscriptions': 'Subscriptions',
  '/data-group': 'Data Drop',
  '/teams': 'Team',
  '/api-keys': 'API Keys',
  '/historical': 'Historical Upload',
}

export function TopNavigation() {
  const location = useLocation()
  const pathname = location.pathname

  // Generate breadcrumbs based on current path
  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Dashboard', href: '/dashboard' }]

    if (segments.length > 0 && pathname !== '/dashboard') {
      const currentPath = `/${segments.join('/')}`
      const label = formatBreadCrumbLabel(
        ROUTE_LABELS[currentPath] || segments[segments.length - 1],
      )
      breadcrumbs.push({ label, href: currentPath })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="border-b border-border bg-background px-6 py-4 w-full">
      <div className="flex items-center gap-2">
        <PanelLeft className="h-5 w-5 text-foreground" />
        <span className="text-muted-foreground px-2">|</span>
        <div className="flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-sm font-normal text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.href}
                  className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
