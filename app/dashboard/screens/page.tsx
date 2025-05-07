"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScreensList } from "@/components/screens-list"
import { fetchScreens } from "@/lib/api"
import type { Screen } from "@/lib/types"

export default function ScreensPage() {
  const [screens, setScreens] = useState<Screen[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const getScreens = async () => {
      try {
        setIsLoading(true)
        const data = await fetchScreens({ name: searchTerm || undefined })
        setScreens(data.screens)
      } catch (error) {
        console.error("Failed to fetch screens:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getScreens()
  }, [searchTerm])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Screens</h1>
          <p className="text-muted-foreground">Manage your stock screening criteria</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/screens/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Screen
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Screens</CardTitle>
          <CardDescription>View, edit, and run your saved screening criteria</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search screens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScreensList screens={screens} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
