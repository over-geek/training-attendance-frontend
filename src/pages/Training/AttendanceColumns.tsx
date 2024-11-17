import { ColumnDef } from "@tanstack/react-table"
import { Attendance } from "@/components/filter_table/data/type"

export const columns: ColumnDef<Attendance>[] = [
  {
      accessorKey: "employeeName",
      header: "Name",
      cell: ({ row }) => <div className="lowercase">{row.getValue("employeeName")}</div>,
  },
  {
      accessorKey: "employeeDepartment",
      header: "Department",
      cell: ({ row }) => <div className="lowercase">{row.getValue("employeeDepartment")}</div>
  },
  {
    accessorKey: "createdOn",
    header: "Time",
    cell: ({ row }) => {
      const createdOn = row.getValue("createdOn") as string;
      const time = new Date(createdOn).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      return <div className="lowercase">{time}</div>;
    },
  }
]