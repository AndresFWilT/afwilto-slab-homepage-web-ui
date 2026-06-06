import { ServiceProvider } from '@/di'
import { AppRouter } from '@/router'
import { ErrorBoundary } from '@/design-system'

export function App() {
  return (
    <ErrorBoundary>
      <ServiceProvider>
        <AppRouter />
      </ServiceProvider>
    </ErrorBoundary>
  )
}
