import { Table } from "@tanstack/react-table"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Training } from "./data/type"
import { DataTableFacetedFilter } from "./dataTableFacetedFilter"
import { statuses, trainingType } from "./data/data"

interface DataTableToolbarProps {
    table: Table<Training>
}

export const DataTableToolbar = ({ table }: DataTableToolbarProps) => {
    return (
        <div className="flex items-center py-4">
            <div className="flex space-x-2">
                <Input
                    placeholder="Search by name..."
                    value={(table.getColumn("agenda")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("agenda")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[250px] lg:w-[400px] "
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter options={statuses} title="Status" column={table.getColumn("status")} />
                )}
                {table.getColumn("trainingType") && (
                    <DataTableFacetedFilter options={trainingType} title="Training Type" column={table.getColumn("trainingType")} />
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}