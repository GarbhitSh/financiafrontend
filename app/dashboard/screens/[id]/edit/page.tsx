"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { CriteriaBuilder } from "@/components/criteria-builder"
import { fetchScreen, updateScreen } from "@/lib/api"
import type { ScreenCriteria } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

export default function EditScreenPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [criteria, setCriteria] = useState<ScreenCriteria[]>([])

  useEffect(() => {
    const getScreen = async () => {
      try {
        setIsLoading(true)
        const screen = await fetchScreen(Number.parseInt(params.id))
        setName(screen.name)
        setDescription(screen.description || "")
        setIsPublic(screen.is_public)
        setCriteria(screen.criteria)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      toast({
        title: "Validation Error",
        description: "Screen name is required",
        variant: "destructive",
      })
      return
    }

    if (criteria.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one criterion is required",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await updateScreen(Number.parseInt(params.id), {
        name,
        description,
        is_public: isPublic,
        criteria,
      })

      toast({
        title: "Success",
        description: "Screen updated successfully",
      })

      router.push(`/dashboard/screens/${params.id}`)
    } catch (error) {
      console.error("Failed to update screen:", error)
      toast({
        title: "Error",
        description: "Failed to update screen. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Screen</h1>
        <p className="text-muted-foreground">Update your stock screening criteria</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Screen Details</CardTitle>
            <CardDescription>Update basic information about your screen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="public">Make this screen public</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Screening Criteria</CardTitle>
            <CardDescription>Update the conditions stocks must meet</CardDescription>
          </CardHeader>
          <CardContent>
            <CriteriaBuilder criteria={criteria} setCriteria={setCriteria} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Screen"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
