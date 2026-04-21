import { AlertTriangle } from 'lucide-react'

export function UnderConstructionBanner() {
  return (
    <div className="bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white px-4 py-3 text-center">
      <div className="flex items-center justify-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">
          This site is under construction. Documentation and features are still being developed.
        </span>
        <AlertTriangle className="w-5 h-5" />
      </div>
    </div>
  )
}