import { Play, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Screen } from "@/lib/types"

interface ScreensListProps {
  screens: Screen[]
  isLoading: boolean
}

export function ScreensList({ screens, isLoading }: ScreensListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b pb-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
              <div className="flex space-x-2 pt-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (screens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-4">No screens found</p>
        <Button asChild>
          <Link href="/dashboard/screens/create">Create your first screen</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {screens.map((screen) => (
        <div key={screen.id} className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-medium text-lg">
              <Link href={`/dashboard/screens/${screen.id}`} className="hover:underline">
                {screen.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{screen.description || "No description provided"}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant={screen.is_public ? "default" : "outline"}>
                {screen.is_public ? "Public" : "Private"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Created {new Date(screen.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={`/dashboard/screens/${screen.id}`}>
                <Play className="mr-1 h-4 w-4" />
                Run
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/dashboard/screens/${screen.id}/edit`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/dashboard/screens/${screen.id}`}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
