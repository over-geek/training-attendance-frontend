// types.ts
export type Training = {
    id: string;
    name: string;
    date: string;  // ISO format for date (e.g., "2024-10-01T14:30:00Z")
    duration: number; 
    facilitator: string;
    time: string;
    status: "upcoming" | "done" | "in progress";
};

export type Attendance = {
    id: string;
    employeeName: string;
    employeeDepartment: string;
    createdOn: string;  // ISO format for date (e.g., "2024-10-01T14:30:00Z")
}
