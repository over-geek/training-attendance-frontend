"use client"
import { useParams, useLocation } from "react-router-dom"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import { columns } from "./AttendanceColumns"
import { DataTablePagination } from "../../components/filter_table/tablePagination"
import { Attendance } from "../../components/filter_table/data/type"
import {useEffect, useState} from "react";
import axios from "axios";

function TrainingDetail() {
    const { id } = useParams()
    const location = useLocation()
    const training = location.state?.training

    const [data, setData] = useState<Attendance[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      if (id) {
        const fetchAttendanceLogs = async () => {
          try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/api/attendance/logs/${id}`)
            const logs = response.data.attendees
            console.log("logs: ", logs)
            setData(logs)
          } catch (error) {
            setError('Failed to load attendance Logs')
          } finally {
            setLoading(false)
          }
        }
  
        fetchAttendanceLogs()
      }
    }, [id])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: { pageSize: (window.innerWidth > 1600) ? 10 : 5 }
        }
    })

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='border px-6 py-4 bg-gray-100 h-full flex flex-col gap-5'>
          <div className='flex justify-between items-center bg-white px-5 py-3'>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <p>Agenda:</p>
                <p>{training.agenda}</p>
              </div>
              <div className='flex gap-2'>
                <p>Facilitator:</p>
                <p>{training.facilitator}</p>
              </div>
            </div>
            <div>
              <Button>Start Session</Button>
            </div>
          </div>
          {/* <div className="flex gap-8">
            <StatsCards statTitle="Recorded Responses" statScore={8} />
            <StatsCards statTitle="Recorded Attendees" statScore={totalAttendees} />
          </div> */}
          <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                Session not started yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination table={table} />
          </div>
        </div>
    )
}

export default TrainingDetail