import React from 'react'
import PageHeader from "../components/PageHeader.jsx";
import TopNav from "../components/TopNav.jsx";

const Responses = () => {
  return (
    <div>
      <TopNav
          headerTitle="Responses"
          links={[
            { to: "home", name: "Home" },
            { to: "new", name: "New Training" },
          ]}
      />
    </div>
  )
}

export default Responses