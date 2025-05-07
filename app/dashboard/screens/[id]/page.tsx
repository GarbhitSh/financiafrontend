"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScreenResultsTable } from "@/components/screen-results-table"
import { CriteriaList } from "@/components/criteria-list"
import { fetchScreen, runScreen, deleteScreen } from "@/lib/api"
import type { Screen, ScreenResult } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

export default function ScreenDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [screen, setScreen] = useState<Screen | null>(null)
  const [results, setResults] = useState<ScreenResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const getScreen = async () => {
      try {
        setIsLoading(true)
        const data = await fetchScreen(Number.parseInt(params.id))
        setScreen(data)
      } catch (error) {
        console.error("Failed to fetch screen:", error)
        toast({
          title: "Error",
          description: "Failed to load screen details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getScreen()
  }, [params.id])

  const handleRunScreen = async () => {
    try {
      setIsRunning(true)
      const data = await runScreen(Number.parseInt(params.id))
      setResults(data)
      toast({
        title: "Success",
        description: `Screen executed in ${data.execution_time.toFixed(2)}s`,
      })
    } catch (error) {
      console.error("Failed to run screen:", error)
      toast({
        title: "Error",
        description: "Failed to run screen",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleDeleteScreen = async () => {
    try {
      setIsDeleting(true)
      await deleteScreen(Number.parseInt(params.id))
      toast({
        title: "Success",
        description: "Screen deleted successfully",
      })
      router.push("/dashboard/screens")
    } catch (error) {
      console.error("Failed to delete screen:", error)
      toast({
        title: "Error",
        description: "Failed to delete screen",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!screen) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Screen not found</h2>
        <Button className="mt-4" onClick={() => router.push("/dashboard/screens")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Screens
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{screen.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={screen.is_public ? "default" : "outline"}>
                {screen.is_public ? "Public" : "Private"}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Created {new Date(screen.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleRunScreen} disabled={isRunning}>
            <Play className="mr-2 h-4 w-4" />
            {isRunning ? "Running..." : "Run Screen"}
          </Button>
          <Button variant="outline" asChild>
            <a href={`/dashboard/screens/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </a>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the screen and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteScreen}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {screen.description && (
        <Card>
          <CardContent className="pt-6">
            <p>{screen.description}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Screening Criteria</CardTitle>
          <CardDescription>Conditions stocks must meet to be included in results</CardDescription>
        </CardHeader>
        <CardContent>
          <CriteriaList criteria={screen.criteria} />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>
            {results ? `${results.count} stocks matched your criteria` : "Run the screen to see matching stocks"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results ? (
            <ScreenResultsTable results={results.results} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">
                No results to display. Run the screen to see matching stocks.
              </p>
              <Button onClick={handleRunScreen} disabled={isRunning}>
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running..." : "Run Screen"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
