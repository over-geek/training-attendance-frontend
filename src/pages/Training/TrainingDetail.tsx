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
import { updateTrainingStatus, startTrainingSession, fetchTrainingById, endTrainingSession } from "@/components/filter_table/data/trainingData"

function TrainingDetail() {
    const { id } = useParams()
    const location = useLocation()
    const [training, setTraining] = useState(location.state?.training);
    const [data, setData] = useState<Attendance[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [totalAttendees, setTotalAttendees] = useState<number>(0)
    const [evalResponseLength, setEvalResponseLength] = useState<number>(0)
    const [isExporting, setIsExporting] = useState<boolean>(false)

    const { toast } = useToast()

    useEffect(() => {
      if (id) {
        const fetchData = async () => {
          try {
            setLoading(true);
            const [trainingData, attendanceResponse] = await Promise.all([
              fetchTrainingById(id),
              axios.get(`http://localhost:8080/api/attendance/logs/${id}`)
            ]);
            
            if (trainingData) {
              setTraining(trainingData);
            }

            const evalResponseLength = await fetchEvalResponseLength(id);
            const logs = attendanceResponse.data.attendees;
            setTotalAttendees(logs.length);
            setEvalResponseLength(evalResponseLength);
            setData(logs);
          } catch (error) {
            setError('Failed to load data');
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    }, [id]);

    const handleStartSession = async () => {
        if (!id) return;
        
        try {
            // Show immediate feedback to user
            toast({
                description: "Training Session Started",
            });
            
            // Update local state immediately
            setTraining((prev) => ({ ...prev, status: "in progress" }));

            // Start both operations in parallel
            const [sessionStarted, response] = await Promise.all([
                startTrainingSession(id),
                updateTrainingStatus(id, "in progress")
            ]);

            if (!sessionStarted || !response) {
                // Revert the state if either operation fails
                setTraining((prev) => ({ ...prev, status: "upcoming" }));
                
                toast({
                    variant: "destructive",
                    description: "There was a problem starting the training",
                    title: "Uh oh! Something went wrong",
                });
            }
        } catch (error) {
            // Revert the state if there's an error
            setTraining((prev) => ({ ...prev, status: "upcoming" }));
            
            toast({
                variant: "destructive",
                description: "There was a problem starting the training",
                title: "Uh oh! Something went wrong",
            });
        }
    }

    const handleEndSession = async () => {
      if (!id) return;
      // const response = await updateTrainingStatus(id, "done")
      const [sessionEnded, response] = await Promise.all([
        endTrainingSession(id),
        updateTrainingStatus(id, "done")
      ])
      if (response && sessionEnded) {
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

    const downloadPDF = async (trainingId) => {
      setIsExporting(true)
      try {
        const response = await axios({
          url: `http://localhost:8080/api/evaluation/logs/${trainingId}/pdf`,
          method: "GET",
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/zip" });

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `responses_training_${trainingId}.zip`); // Customize the file name
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } catch (error) {
          console.error('Error downloading PDF:', error);
          toast({
              variant: "destructive",
              description: "Failed to export training responses",
              title: "Export failed",
          })
      } finally {
          setIsExporting(false)
      }

  };

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
              <TrainingQrCode trainingId={id} status={training.status} />
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
                  <Button
                    size="sm"
                    disabled={isExporting}
                    onClick={() => downloadPDF(training.id)}
                  >
                    {isExporting ? (
                        <>
                            Exporting...
                        </>
                    ) : (
                        'Export as PDF'
                    )}
                  </Button>
                )
              }
            </div>
          </div>
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