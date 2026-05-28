import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Upload,
  Globe,
  Server,
} from 'lucide-react'

const PLATFORM_MENU = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/templates', label: 'Templates', icon: FileText },
  { href: '/services', label: 'Services', icon: Server },
  { href: '/universe-definition', label: 'Universe Definition', icon: Globe },
  { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/data-drop', label: 'Data Drop', icon: Upload },
]

const ADMIN_MENU = [
  { href: '/teams', label: 'Team', icon: LayoutDashboard },
  { href: '/api-keys', label: 'API Keys', icon: FileText },
  { href: '/historical', label: 'Historical Upload', icon: Server },
]

type SideBarMenuNavProps = {
  menuTitle: string
  menuItems: typeof PLATFORM_MENU
}

export const SideBarMenuNav = ({
  menuTitle,
  menuItems,
}: SideBarMenuNavProps) => {
  const location = useLocation()
  return (
    <div>
      <h4 className="mb-2 mt-4 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {menuTitle}
      </h4>
      <nav className="flex flex-col gap-2">
        {menuItems?.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="min-w-60 border-r border-border bg-background p-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
          A
        </div>
        <div>
          <div className="text-sm font-semibold">Acme Bank</div>
          <div className="text-xs text-muted-foreground">Contributor</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-2">
        <SideBarMenuNav menuTitle="Platform" menuItems={PLATFORM_MENU} />
        <SideBarMenuNav menuTitle="Admin" menuItems={ADMIN_MENU} />
      </div>
    </aside>
  )
}
