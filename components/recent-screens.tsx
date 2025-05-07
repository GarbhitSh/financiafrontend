import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Screen } from "@/lib/types"

interface RecentScreensProps {
  screens: Screen[]
  isLoading: boolean
}

export function RecentScreens({ screens, isLoading }: RecentScreensProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  if (screens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-muted-foreground mb-4">No screens created yet</p>
        <Button asChild>
          <Link href="/dashboard/screens/create">Create your first screen</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {screens.map((screen) => (
        <div key={screen.id} className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{screen.name}</h3>
            <p className="text-sm text-muted-foreground">{new Date(screen.created_at).toLocaleDateString()}</p>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/screens/${screen.id}`}>
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">View screen</span>
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
