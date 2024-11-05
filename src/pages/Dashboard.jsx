import React from 'react'
import TrainingAttendanceForm from "@/components/Templates/TrainingAttendanceForm.tsx";

const Dashboard = () => {
  return (
      <TrainingAttendanceForm
          training={{
            title: "Information Security Management System",
            type: "Staff Training",
            date: "13-10-2024",
            time: '11:30',
            duration: '1 hour',
            facilitator: 'Jeremy Nyarko',
            attendees: [
              { name: 'John Doe', department: 'Sales' },
              { name: 'Emily Davis', department: 'HR' },
              { name: 'Michael Brown', department: 'Finance' },
              { name: 'Sarah Taylor', department: 'Marketing' },
              { name: 'Bob Johnson', department: 'IT' }
            ]
          }}
          isPdfExport={true}
      />
  )
}

export default Dashboard