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

export interface Column<T> {
  header: string
  accessorKey?: keyof T
  className?: string
  cell?: (item: T) => React.ReactNode
}

interface CustomTableProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function CustomTable<T>({ data, columns }: CustomTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
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
        ))}
      </TableBody>
    </Table>
  )
}