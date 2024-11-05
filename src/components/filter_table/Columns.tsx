import { ColumnDef } from "@tanstack/react-table"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Training } from "./data/type"
import { TableActions } from "./tableActions"

export const columns: ColumnDef<Training>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const dateString = row.getValue("date") as string
            const date = new Date(dateString)
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            return <div>{formattedDate}</div>
        },
    },
    {
        accessorKey: "agenda",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue("agenda")}</div>,
    },
    {
        accessorKey: "facilitator",
        header: "Facilitator",
        cell: ({ row }) => <div className="lowercase">{row.getValue("facilitator")}</div>,
    },
    {
        accessorKey: "trainingType",
        header: "Type",
        cell: ({ row }) => <div className="lowercase">{row.getValue("trainingType")}</div>,
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => <div className="lowercase">{row.getValue("duration")}</div>,
    },
    {
        accessorKey: "startTime",
        header: "Time",
        cell: ({ row }) => {
            const time = row.getValue("startTime") as string
            const [hours, minutes, seconds] = time.split(":").map(Number)
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(seconds);
            const formatted = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <TableActions row={row} />,
    },
]