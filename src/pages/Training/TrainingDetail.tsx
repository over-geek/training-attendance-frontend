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

import StatsCards from "@/components/StatsCards.jsx"

import {useToast} from "@/hooks/use-toast.ts"

import { Button } from "@/components/ui/button"
import { Status } from "@/components/ui/status"
import TrainingQrCode from "../../components/EvaluationQRCode.jsx"

import { columns } from "./AttendanceColumns"
import { DataTablePagination } from "../../components/filter_table/tablePagination"
import { Attendance } from "../../components/filter_table/data/type"
import {useEffect, useState} from "react";
import axios from "axios";
import { fetchEvalResponseLength } from "@/services/utils.js"
import { updateTrainingStatus } from "@/components/filter_table/data/trainingData"

function TrainingDetail() {
    const { id } = useParams()
    const location = useLocation()
    const [training, setTraining] = useState(location.state?.training);
    const [data, setData] = useState<Attendance[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [remainingTime, setRemainingTime] = useState<number | null>(null)
    const [isCountingDown, setIsCountingDown] = useState<boolean>(false)
    const [totalAttendees, setTotalAttendees] = useState<number>(0)
    const [evalResponseLength, setEvalResponseLength] = useState<number>(0)

    const { toast } = useToast()

    useEffect(() => {
      if (id) {
        const fetchAttendanceLogs = async () => {
          try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8080/api/attendance/logs/${id}`)
            const evalResponseLength = await fetchEvalResponseLength(id)
            const logs = response.data.attendees
            setTotalAttendees(logs.length)
            setEvalResponseLength(evalResponseLength)
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

    useEffect(() => {
      let timer: NodeJS.Timeout | undefined;
      if (isCountingDown && remainingTime !== null && remainingTime > 0) {
        timer = setInterval(() => {
          setRemainingTime((prev) => (prev !== null ? prev - 1 : null));
        }, 1000);
      }
      if (remainingTime === 0) {
        clearInterval(timer);
        setIsCountingDown(false);
        toast({
          description: "Training session has ended!",
        });
      }
      return () => clearInterval(timer);
    }, [isCountingDown, remainingTime]);

    const handleStartSession = async () => {
      if (!id) return;
      const response = await updateTrainingStatus(id, "in progress")
      if (response) {
        toast({
            description: "Training Session Started",
        });
        const durationInSeconds = parseInt(training.duration, 10) * 3600; // Convert hours to seconds
        setRemainingTime(durationInSeconds);
        setIsCountingDown(true);
        setTraining((prev) => ({ ...prev, status: response.status }));
      } else {
          toast({
              variant: "destructive",
              description: "There was a problem starting the training",
              title: "Uh oh! Something went wrong",
          });
      }
      console.log(response)
      setTraining((prev) => ({ ...prev, status: response.status }))
    }

    const handleEndSession = async () => {
      if (!id) return;
      const response = await updateTrainingStatus(id, "done")
      if (response) {
        toast({
            description: "Training Session Ended",
        });
        setTraining((prev) => ({ ...prev, status: response.status }));
      } else {
          toast({
              variant: "destructive",
              description: "There was a problem ending the training",
              title: "Uh oh! Something went wrong",
          });
      }
    }

    const formatTime = (seconds: number) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`;
    };

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
            <div className="flex gap-4">
              <TrainingQrCode trainingId={id} />
              {
                training.status === "upcoming" && (
                  <Button onClick={handleStartSession} size="sm">
                    {training.status === "upcoming" ? "Start Session" : "End Session"}
                  </Button>
                )
              }
              {
                training.status === "in progress" && (
                  <Button onClick={handleEndSession} size="sm">
                    End Session
                  </Button>
                )
              }
              {
                training.status === "done" && (
                  <Button size="sm">
                    Export Reponses
                  </Button>
                )
              }
            </div>
          </div>
          {isCountingDown && remainingTime !== null && (
            <div className="text-center text-xl font-bold text-red-500">
              Time Remaining: {formatTime(remainingTime)}
            </div>
          )}
          <div className="flex gap-8">
            <StatsCards statTitle="Recorded Responses" statScore={evalResponseLength} />
            <StatsCards statTitle="Recorded Attendees" statScore={totalAttendees} />
          </div>
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
                                {training.status === "in progress" ? (<Status value="success">Session In Progress</Status>) : "Session not started yet"}
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