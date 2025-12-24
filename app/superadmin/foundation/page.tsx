"use client"

import { useState } from "react"
import { SuperAdminLayout } from "@/components/super-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Users,
  Target,
  TrendingUp,
  Calendar,
} from "lucide-react"

// Mock foundation work data
type FoundationWork = {
  id: number
  title: string
  description: string
  category: string
  status: "Planning" | "Active" | "Completed" | "On Hold"
  startDate: string
  endDate?: string
  budget: number
  beneficiaries: number
  impact: string
}

const initialFoundationWork: FoundationWork[] = [
  {
    id: 1,
    title: "Senior Health & Wellness Program",
    description: "Monthly health checkups and wellness activities for all residents",
    category: "Health",
    status: "Active",
    startDate: "2024-01-15",
    budget: 15000,
    beneficiaries: 62,
    impact: "High",
  },
  {
    id: 2,
    title: "Community Gardening Initiative",
    description: "Creating therapeutic gardens for residents to engage in gardening activities",
    category: "Recreation",
    status: "Planning",
    startDate: "2024-02-01",
    budget: 8500,
    beneficiaries: 45,
    impact: "Medium",
  },
  {
    id: 3,
    title: "Digital Literacy Workshop",
    description: "Teaching seniors how to use technology to stay connected with family",
    category: "Education",
    status: "Active",
    startDate: "2023-11-10",
    budget: 5000,
    beneficiaries: 38,
    impact: "High",
  },
  {
    id: 4,
    title: "Emergency Fund Support",
    description: "Financial assistance for residents facing unexpected medical expenses",
    category: "Financial Aid",
    status: "Completed",
    startDate: "2023-09-01",
    endDate: "2023-12-31",
    budget: 25000,
    beneficiaries: 12,
    impact: "Critical",
  },
]

export default function FoundationWorkPage() {
  const [foundationWorks, setFoundationWorks] = useState<FoundationWork[]>(initialFoundationWork)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<FoundationWork | null>(null)
  const [newWork, setNewWork] = useState<Partial<FoundationWork>>({
    title: "",
    description: "",
    category: "",
    status: "Planning",
    startDate: "",
    budget: 0,
    beneficiaries: 0,
    impact: "Medium",
  })

  const handleCreateWork = () => {
    if (newWork.title && newWork.description) {
      const work: FoundationWork = {
        id: foundationWorks.length + 1,
        title: newWork.title,
        description: newWork.description,
        category: newWork.category || "Other",
        status: newWork.status || "Planning",
        startDate: newWork.startDate || new Date().toISOString().split("T")[0],
        budget: newWork.budget || 0,
        beneficiaries: newWork.beneficiaries || 0,
        impact: newWork.impact || "Medium",
      }
      setFoundationWorks([...foundationWorks, work])
      setIsCreateDialogOpen(false)
      setNewWork({
        title: "",
        description: "",
        category: "",
        status: "Planning",
        startDate: "",
        budget: 0,
        beneficiaries: 0,
        impact: "Medium",
      })
    }
  }

  const handleEditWork = () => {
    if (selectedWork) {
      setFoundationWorks(
        foundationWorks.map((work) => (work.id === selectedWork.id ? { ...work, ...selectedWork } : work)),
      )
      setIsEditDialogOpen(false)
      setSelectedWork(null)
    }
  }

  const handleDeleteWork = (id: number) => {
    setFoundationWorks(foundationWorks.filter((work) => work.id !== id))
  }

  const handleViewWork = (work: FoundationWork) => {
    setSelectedWork(work)
    setIsViewDialogOpen(true)
  }

  const handleEditClick = (work: FoundationWork) => {
    setSelectedWork({ ...work })
    setIsEditDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Completed":
        return "secondary"
      case "Planning":
        return "outline"
      case "On Hold":
        return "destructive"
      default:
        return "default"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalBudget = foundationWorks.reduce((sum, work) => sum + work.budget, 0)
  const totalBeneficiaries = foundationWorks.reduce((sum, work) => sum + work.beneficiaries, 0)
  const activeProjects = foundationWorks.filter((work) => work.status === "Active").length

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Foundation Work</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Manage community initiatives, charitable programs, and social impact projects
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-4" />
                New Initiative
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Foundation Work</DialogTitle>
                <DialogDescription>
                  Add a new charitable initiative or community program to support residents and the broader community.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-title">Title *</Label>
                  <Input
                    id="new-title"
                    placeholder="Program name"
                    value={newWork.title}
                    onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-description">Description *</Label>
                  <Textarea
                    id="new-description"
                    placeholder="Describe the initiative and its goals"
                    rows={4}
                    value={newWork.description}
                    onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new-category">Category</Label>
                    <Select
                      value={newWork.category}
                      onValueChange={(value) => setNewWork({ ...newWork, category: value })}
                    >
                      <SelectTrigger id="new-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Recreation">Recreation</SelectItem>
                        <SelectItem value="Financial Aid">Financial Aid</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-status">Status</Label>
                    <Select
                      value={newWork.status}
                      onValueChange={(value: any) => setNewWork({ ...newWork, status: value })}
                    >
                      <SelectTrigger id="new-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new-startDate">Start Date</Label>
                    <Input
                      id="new-startDate"
                      type="date"
                      value={newWork.startDate}
                      onChange={(e) => setNewWork({ ...newWork, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-budget">Budget ($)</Label>
                    <Input
                      id="new-budget"
                      type="number"
                      placeholder="0"
                      value={newWork.budget}
                      onChange={(e) => setNewWork({ ...newWork, budget: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new-beneficiaries">Beneficiaries</Label>
                    <Input
                      id="new-beneficiaries"
                      type="number"
                      placeholder="0"
                      value={newWork.beneficiaries}
                      onChange={(e) => setNewWork({ ...newWork, beneficiaries: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-impact">Impact Level</Label>
                    <Select value={newWork.impact} onValueChange={(value) => setNewWork({ ...newWork, impact: value })}>
                      <SelectTrigger id="new-impact">
                        <SelectValue placeholder="Select impact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWork}>Create Initiative</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Active Projects</CardDescription>
                <Target className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Budget Allocated</CardDescription>
                <TrendingUp className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all initiatives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Beneficiaries</CardDescription>
                <Users className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBeneficiaries}</div>
              <p className="text-xs text-muted-foreground mt-1">People impacted</p>
            </CardContent>
          </Card>
        </div>

        {/* Foundation Work Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>All Foundation Initiatives</CardTitle>
                <CardDescription>View and manage all charitable programs and community projects</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search initiatives..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <Filter className="size-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Initiative</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Budget</TableHead>
                    <TableHead className="hidden sm:table-cell">Beneficiaries</TableHead>
                    <TableHead className="hidden xl:table-cell">Impact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foundationWorks.map((work) => (
                    <TableRow key={work.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{work.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1 md:hidden">
                            {work.category} • ${work.budget.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{work.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(work.status)}>{work.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">${work.budget.toLocaleString()}</TableCell>
                      <TableCell className="hidden sm:table-cell">{work.beneficiaries}</TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="flex items-center gap-2">
                          <div className={`size-2 rounded-full ${getImpactColor(work.impact)}`} />
                          <span className="text-sm">{work.impact}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewWork(work)}>
                              <Eye className="mr-2 size-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditClick(work)}>
                              <Edit2 className="mr-2 size-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteWork(work.id)}>
                              <Trash2 className="mr-2 size-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedWork?.title}</DialogTitle>
              <DialogDescription>Foundation Initiative Details</DialogDescription>
            </DialogHeader>
            {selectedWork && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="text-sm">{selectedWork.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Category</Label>
                    <Badge variant="outline" className="w-fit">
                      {selectedWork.category}
                    </Badge>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge variant={getStatusColor(selectedWork.status)} className="w-fit">
                      {selectedWork.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Start Date</Label>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="size-4" />
                      {selectedWork.startDate}
                    </p>
                  </div>
                  {selectedWork.endDate && (
                    <div className="grid gap-2">
                      <Label className="text-muted-foreground">End Date</Label>
                      <p className="text-sm flex items-center gap-2">
                        <Calendar className="size-4" />
                        {selectedWork.endDate}
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Budget</Label>
                    <p className="text-sm font-semibold">${selectedWork.budget.toLocaleString()}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Beneficiaries</Label>
                    <p className="text-sm font-semibold">{selectedWork.beneficiaries} people</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Impact Level</Label>
                  <div className="flex items-center gap-2">
                    <div className={`size-3 rounded-full ${getImpactColor(selectedWork.impact)}`} />
                    <span className="text-sm font-medium">{selectedWork.impact}</span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Foundation Work</DialogTitle>
              <DialogDescription>Update the details of this charitable initiative.</DialogDescription>
            </DialogHeader>
            {selectedWork && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={selectedWork.title}
                    onChange={(e) => setSelectedWork({ ...selectedWork, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    rows={4}
                    value={selectedWork.description}
                    onChange={(e) => setSelectedWork({ ...selectedWork, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={selectedWork.category}
                      onValueChange={(value) => setSelectedWork({ ...selectedWork, category: value })}
                    >
                      <SelectTrigger id="edit-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Recreation">Recreation</SelectItem>
                        <SelectItem value="Financial Aid">Financial Aid</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={selectedWork.status}
                      onValueChange={(value: any) => setSelectedWork({ ...selectedWork, status: value })}
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-startDate">Start Date</Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={selectedWork.startDate}
                      onChange={(e) => setSelectedWork({ ...selectedWork, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-budget">Budget ($)</Label>
                    <Input
                      id="edit-budget"
                      type="number"
                      value={selectedWork.budget}
                      onChange={(e) => setSelectedWork({ ...selectedWork, budget: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-beneficiaries">Beneficiaries</Label>
                    <Input
                      id="edit-beneficiaries"
                      type="number"
                      value={selectedWork.beneficiaries}
                      onChange={(e) => setSelectedWork({ ...selectedWork, beneficiaries: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-impact">Impact Level</Label>
                    <Select
                      value={selectedWork.impact}
                      onValueChange={(value) => setSelectedWork({ ...selectedWork, impact: value })}
                    >
                      <SelectTrigger id="edit-impact">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditWork}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}
