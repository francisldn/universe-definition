# Universe Definition

A modern React application for managing universe definitions with advanced filtering, data visualization, and CSV import capabilities.

## 🏗️ Architecture Overview

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand with localStorage persistence
- **Styling**: Tailwind CSS 4
- **Data Grid**: AG Grid (Community Edition)
- **UI Components**: Custom shadcn-inspired components with Base UI
- **Routing**: React Router v7
- **Data Fetching**: TanStack React Query
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React

### Project Structure

```
src/
├── components/
│   ├── common/              # Reusable common components
│   │   ├── Header.tsx       # Page header component
│   │   ├── Layout.tsx       # Main layout with sidebar and top nav
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── TopNavigation.tsx # Breadcrumb navigation
│   │   ├── UploadButton.tsx # Reusable upload button
│   │   └── CSVUploader.tsx  # CSV file upload handler
│   ├── ui/                  # Base UI components (button, input, select, etc.)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   └── universe-definition/
│       └── UniverseFilters.tsx # Filter controls for universe data
├── pages/
│   ├── Dashboard.tsx        # Main dashboard page
│   ├── Templates.tsx        # Templates management page
│   ├── Services.tsx         # Services management page
│   └── UniverseDefinitionPage.tsx # Universe definition data grid
├── store/
│   └── universeStore.ts     # Zustand store for filter state with localStorage persistence
├── lib/
│   ├── mock-data.ts         # Mock data generation
│   └── universe-mock-data.ts # Universe-specific mock data
├── types/
│   ├── types.ts             # General TypeScript types
│   └── universe-types.ts    # Universe definition specific types
├── services/
│   └── api.ts               # API service layer
├── hooks/
│   └── hooks.ts             # Custom React hooks
├── utils/
│   └── utils.ts             # Utility functions
├── App.tsx                  # Root app component
├── main.tsx                 # Entry point
├── App.css                  # Global styles
└── index.css                # Base styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd universe-definition
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another available port)

## 📦 Available Scripts

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start development server with hot reload   |
| `npm run build`        | Build for production (TypeScript + Vite)   |
| `npm run preview`      | Preview production build locally           |
| `npm run lint`         | Run ESLint to check code quality           |
| `npm run lint:fix`     | Automatically fix linting issues           |
| `npm run format`       | Format code with Prettier                  |
| `npm run format:check` | Check if code matches formatting standards |

## 🔑 Key Features

### 1. **Responsive Layout System**

- Top navigation bar with breadcrumb support
- Sidebar navigation with active route highlighting
- Mobile-responsive design using Tailwind CSS

### 2. **Advanced Data Filtering**

- Filter by name, service, region, asset, type, and status
- State managed globally with Zustand
- Filter state persisted to localStorage for user convenience
- Real-time data grid updates

### 3. **Data Grid**

- AG Grid for high-performance data display
- Sortable and filterable columns
- Pagination support (7, 10, 20, 50 rows per page)
- Column definitions for various data types

### 4. **CSV Import**

- Drag-and-drop CSV file upload
- PapaParse for efficient CSV parsing
- Error handling for malformed files

### 5. **Component System**

- Reusable UI components in `src/components/ui/`
- Common components for layout and navigation
- Base UI integration for accessible components

## 🎯 State Management

### Zustand Store (universeStore)

The store manages filter state with localStorage persistence:

```typescript
// Access in any component
const {
  filterName,
  filterService,
  filterRegion,
  filterAsset,
  filterType,
  filterStatus,
} = useUniverseStore()

// Update filters
const {
  setFilterName,
  setFilterService,
  setFilterRegion,
  setFilterAsset,
  setFilterType,
  setFilterStatus,
} = useUniverseStore()

// Reset all filters
const { resetFilters } = useUniverseStore()
```

## 🔄 Routing

Routes are defined in `src/main.tsx`:

| Path                   | Component                                 | Description          |
| ---------------------- | ----------------------------------------- | -------------------- |
| `/`                    | App (redirects to UniverseDefinitionPage) | Home page            |
| `/dashboard`           | Dashboard                                 | Dashboard view       |
| `/templates`           | Templates                                 | Templates management |
| `/services`            | Services                                  | Services management  |
| `/universe-definition` | UniverseDefinitionPage                    | Main data grid       |

## 🧪 Development Workflow

### Code Quality

1. **Linting**: Run `npm run lint` to check code style
2. **Formatting**: Run `npm run format` to auto-format code
3. **Type Checking**: TypeScript compilation during build

### Adding New Components

1. Create component in `src/components/`
2. Export from component index or directly import
3. Follow established patterns for styling and types
4. Use Tailwind utility classes for styling

### Adding New Pages

1. Create page file in `src/pages/`
2. Wrap with `<Layout>` component for consistent navigation
3. Add route in `src/main.tsx`
4. Add sidebar menu item in `src/components/common/Sidebar.tsx`

## 📊 Data Flow

```
User Input (Filters)
    ↓
Zustand Store (universeStore)
    ↓
localStorage (persisted)
    ↓
Component Re-render (via useUniverseStore hook)
    ↓
AG Grid Data Filtering
    ↓
Display Updated Grid
```
