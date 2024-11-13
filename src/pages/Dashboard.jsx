import React from 'react'
import { Button }from "../components/ui/button.tsx"
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
      <div>
        <Button>
          <Link to="/evaluation">
            Eval
          </Link>
        </Button>
      </div>

  )
}

export default Dashboard