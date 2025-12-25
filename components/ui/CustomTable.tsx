"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export interface Column<T> {
  header: string
  accessorKey?: keyof T
  className?: string
  cell?: (item: T) => React.ReactNode
}

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig<T> {
  key: keyof T
  title: string
  options: FilterOption[]
}

interface CustomTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T
  searchPlaceholder?: string
  filters?: FilterConfig<T>[]
}

export function CustomTable<T>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  filters = [],
}: CustomTableProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({})

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // Search filter
      if (searchKey && searchQuery) {
        const value = item[searchKey]
        if (String(value).toLowerCase().indexOf(searchQuery.toLowerCase()) === -1) {
          return false
        }
      }

      // Dropdown filters
      for (const filter of filters) {
        const key = filter.key as string
        const activeValue = activeFilters[key]
        if (activeValue && activeValue !== "all") {
          if (String(item[filter.key]) !== activeValue) {
            return false
          }
        }
      }

      return true
    })
  }, [data, searchQuery, activeFilters, searchKey, filters])

  return (
    <div className="space-y-4 ">
      {(searchKey || filters.length > 0) && (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          {searchKey && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
          {filters.length > 0 && (
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Select
                  key={filter.key as string}
                  value={activeFilters[filter.key as string] || "all"}
                  onValueChange={(val) =>
                    setActiveFilters((prev) => ({ ...prev, [filter.key as string]: val }))
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <Filter className="size-4 mr-2" />
                    <SelectValue placeholder={filter.title} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {filter.title}</SelectItem>
                    {filter.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-200">
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={index} className={col.className}>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-muted/50">
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex} className={col.className}>
                        {col.cell
                          ? col.cell(item)
                          : col.accessorKey
                          ? (item[col.accessorKey] as React.ReactNode)
                          : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}