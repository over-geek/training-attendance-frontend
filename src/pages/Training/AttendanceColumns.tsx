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
]