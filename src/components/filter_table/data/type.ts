// types.ts
export type Training = {
    id: string;
    name: string;
    date: string;  // ISO format for date (e.g., "2024-10-01T14:30:00Z")
    duration: number;  // Duration in minutes or hours
    facilitator: string;
    time: string;
    status: "upcoming" | "done"
};

export type Attendance = {
    id: string;
    employeeName: string;
    employeeDepartment: string;
}
