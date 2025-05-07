"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { CriteriaBuilder } from "@/components/criteria-builder"
import { createScreen } from "@/lib/api"
import type { ScreenCriteria } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

export default function CreateScreenPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [criteria, setCriteria] = useState<ScreenCriteria[]>([{ field: "pe_ratio", operator: "<", value: 15 }])

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
      await createScreen({
        name,
        description,
        is_public: isPublic,
        criteria,
      })

      toast({
        title: "Success",
        description: "Screen created successfully",
      })

      router.push("/dashboard/screens")
    } catch (error) {
      console.error("Failed to create screen:", error)
      toast({
        title: "Error",
        description: "Failed to create screen. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Screen</h1>
        <p className="text-muted-foreground">Define your stock screening criteria</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Screen Details</CardTitle>
            <CardDescription>Provide basic information about your screen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Value Stocks" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Stocks with low P/E ratios and strong fundamentals"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
            <CardDescription>Define the conditions stocks must meet</CardDescription>
          </CardHeader>
          <CardContent>
            <CriteriaBuilder criteria={criteria} setCriteria={setCriteria} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Screen"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
