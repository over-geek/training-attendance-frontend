import React from 'react'
import PageHeader from "../components/PageHeader.jsx";
import TopNav from "../components/TopNav.jsx";
import TrainingQRCode from "../components/EvaluationQRCode.jsx";

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
      <TrainingQRCode trainingId={9} />
    </div>
  )
}

export default Responses