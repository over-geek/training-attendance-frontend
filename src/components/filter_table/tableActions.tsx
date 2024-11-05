import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTrigger
} from "@/components/ui/dialog";
import {MenuContent, MenuItem, MenuRoot, MenuTrigger} from "@/components/ui/menu";

import { useState} from "react";
import { createRoot } from "react-dom/client";
import exportPDF from "@/services/exportPDF"

import {deleteTraining} from "@/components/filter_table/data/trainingData";
import {useToast} from "@/hooks/use-toast.ts";
import TrainingAttendanceForm from "@/components/Templates/TrainingAttendanceForm.tsx";


interface TableActionsProps {
    row: any;
    onDelete: () => void;
}

export const TableActions = ({ row, onDelete }: TableActionsProps) => {
    const training = row.original
    const { toast } = useToast()

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [isExporting, setIsExporting] = useState<boolean>(false)

    const handleDelete = async () => {
        const success = await deleteTraining(training.id);
        if (success) {
            toast({
                description: "Training deleted successfully",
            });
            setDialogOpen(false);
            onDelete();
        } else {
            toast({
                variant: "destructive",
                description: "There was a problem deleting the training",
                title: "Uh oh! Something went wrong",
            });
        }
    };

    const handleExport = async () => {
        try {
            setIsExporting(true)

            const response = await fetch(`http://localhost:8080/api/attendance/logs/${training.id}`)
            if (!response.ok) {
                throw new Error ('Failed to fetch training data')
            }
            const attendanceData = await response.json();

            const tempContainer = document.createElement("div");
            tempContainer.id = `training-export-${training.id}`;
            tempContainer.style.position = "absolute";
            tempContainer.style.left = '-9999px'
            document.body.appendChild(tempContainer);

            const root = createRoot(tempContainer);
            root.render(
                <TrainingAttendanceForm
                    training={{
                        title: attendanceData.trainingName,
                        type: attendanceData.trainingType,
                        date: new Date(attendanceData.trainingDate).toLocaleDateString(),
                        time: attendanceData.startTime,
                        duration: `${attendanceData.duration} hour(s)`,
                        facilitator: attendanceData.facilitator,
                        attendees: attendanceData.attendees.map((attendee: any) => ({
                            name: attendee.employeeName,
                            department: attendee.employeeDepartment
                        }))
                    }}
                    isPdfExport={true}
                />
            );

            await new Promise(resolve => setTimeout(resolve, 500))

            await exportPDF(tempContainer, {
                filename: `${attendanceData.trainingName}-Attendance.pdf`,
                pageSize: 'a4',
                orientation: 'portrait',
                scale: 2
            })

        } catch (err) {
            console.error("Export failed: ", err)
            toast({
                variant: "destructive",
                description: "Failed to export training attendance",
                title: "Export failed",
            })
        }
        finally {
            setIsExporting(true)
        }
    }

    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Open menu</span>
                     <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </MenuTrigger>
            <MenuContent className="py-3 px-2">
                <MenuItem value="delete">
                    <DialogRoot role="alertdialog" open={dialogOpen} onOpenChange={(details) => setDialogOpen(details.open)}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                Delete
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="px-5 py-5 flex flex-col gap-5 mt-10">
                            <DialogHeader>
                                <DialogTitle className="font-semi-bold text-xl">Are you sure?</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <p>
                                    This action cannot be undone. This will permanently delete this
                                    training permanently.
                                </p>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline" className="border px-4">Cancel</Button>
                                </DialogActionTrigger>
                                <Button
                                    className="bg-red-500 px-4 "
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                                <DialogCloseTrigger />
                            </DialogFooter>
                        </DialogContent>
                    </DialogRoot>
                </MenuItem>
                <MenuItem value="edit">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                        Edit
                    </Button>
                </MenuItem>
                <MenuItem value="start-session">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                        Start Session
                    </Button>
                </MenuItem>
                { (training.status === "done") && (
                    <MenuItem value="export-as-pdf">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            disabled={isExporting}
                            onClick={handleExport}
                        >
                            {isExporting ? (
                                <>
                                    Exporting...
                                </>
                            ) : (
                                'Export as PDF'
                            )}
                        </Button>
                    </MenuItem>
                ) }
            </MenuContent>
        </MenuRoot>
    )
}