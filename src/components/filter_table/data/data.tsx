import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
]

export const statuses = [
    {
        value: "upcoming",
        label: "Upcoming",
        icon: CircleIcon,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: StopwatchIcon,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircledIcon,
    },
]

export const trainingType = [
    {
        label: "Staff Training",
        value: "staff training",
        icon: ArrowDownIcon,
    },
    {
        label: "Staff Forums",
        value: "staff forum",
        icon: ArrowRightIcon,
    },
]