import React from 'react'
import PageHeader from "../components/PageHeader.jsx";
import TopNav from "../components/TopNav.jsx";

const AttendanceLogs = () => {
  return (
    <TopNav
        headerTitle="Attendance Logs"
        links={[
          { to: "home", name: "Home" },
          { to: "new", name: "New Training" },
        ]}
    />
  )
}

export default AttendanceLogs