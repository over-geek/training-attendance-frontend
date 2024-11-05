import React from 'react'
import PageHeader from "../components/PageHeader.jsx";
import TopNav from "../components/TopNav.jsx";

const Reports = () => {
  return (
    <div>
      <TopNav
          headerTitle="Reports"
          links={[
            { to: "home", name: "Home" },
            { to: "new", name: "New Training" },
          ]}
      />
    </div>
  )
}

export default Reports