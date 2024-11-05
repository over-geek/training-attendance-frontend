import PageHeader from '../components/PageHeader.jsx'
import {Outlet} from "react-router-dom";
import TopNav from '../components/TopNav.jsx'

const Trainings = () => {

  return (
    <section className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0">
        <TopNav
            headerTitle="Employee Trainings"
            links={[
              { to: "", name: "Home" },
              { to: "new", name: "New Training" },
            ]}
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </section>
  )
}

export default Trainings