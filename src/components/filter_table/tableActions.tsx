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

import {deleteTraining} from "@/components/filter_table/data/trainingData";
import {useToast} from "@/hooks/use-toast.ts";


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

    const downloadPDF = async (trainingId) => {
        setIsExporting(true)
        try {
            const response = await fetch(`http://localhost:8080/api/attendance/logs/${trainingId}/pdf`, {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'attendance_log.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
            toast({
                variant: "destructive",
                description: "Failed to export training attendance",
                title: "Export failed",
            })
        } finally {
            setIsExporting(false)
        }

    };

    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                     <span className="sr-only">Open menu</span>
                     <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </MenuTrigger>
            <MenuContent className="py-3 px-2">
                <MenuItem value="delete">
                    <DialogRoot role="alertdialog" open={dialogOpen} onOpenChange={(details) => setDialogOpen(details.open)}>
                        <DialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="w-full justify-start"
                                onClick={(e) => e.stopPropagation()}
                            >
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
                                    <Button 
                                        variant="outline" 
                                        className="border px-4"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setDialogOpen(false)
                                        }}
                                    >Cancel</Button>
                                </DialogActionTrigger>
                                <Button
                                    className="bg-red-500 px-4 "
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete()
                                    }}
                                    
                                >
                                    Delete
                                </Button>
                                <DialogCloseTrigger />
                            </DialogFooter>
                        </DialogContent>
                    </DialogRoot>
                </MenuItem>
                <MenuItem value="edit">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Edit
                    </Button>
                </MenuItem>
                <MenuItem value="start-session">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                    </MenuItem>
                ) }
            </MenuContent>
        </MenuRoot>
    )
}
