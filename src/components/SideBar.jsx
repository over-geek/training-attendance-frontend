import { Link } from 'react-router-dom'
import logo from '../../../../projects/test/src/assets/images/logo.svg'
import {HomeIcon} from "@heroicons/react/20/solid/index.js";
import reportIcon from "../../../../projects/test/src/assets/images/reportIcon.png";
import responseIcon from "../../../../projects/test/src/assets/images/responseIcon.png";
import attendanceIcon from "../../../../projects/test/src/assets/images/attendanceIcon.png";
import trainingIcon from "../../../../projects/test/src/assets/images/training.png"
import dashboardIcon from "../../../../projects/test/src/assets/images/dashboard.png"

const SideBar = () => {
  return (
    <div className='w-1/6 lg:w-1/5 border-x pt-4 px-5 h-full flex-shrink-0'>
      <div className='w-full flex justify-center items-center gap-5'>
        <img src={logo} alt="logo" className='w-32'/>
      </div>
      
      <nav className='mt-12'>
        <ul className='flex flex-col gap-8'>
          <li>
            <Link to="/dashboard" className="flex gap-2 items-center px-2 py-2 rounded-lg">
              <img src={dashboardIcon} alt="dashboard icon" className="w-8" />Dashboard
            </Link>
          </li>
          <li>
            <Link to="/trainings" className="flex gap-2 items-center px-2 py-2 rounded-lg">
              <img src={trainingIcon} alt="training icon" className="w-8" />Trainings
            </Link>
          </li>
          <li>
            <Link to="/reports" className="flex gap-2 items-center px-2 py-2 rounded-lg">
              <img src={reportIcon} alt="response icon" className="w-8" />Reports
            </Link>
          </li>
          <li>
          <Link to="/responses" className="flex gap-2 items-center px-2 py-2 rounded-lg">
            <img src={responseIcon} alt="response icon" className="w-8" />Responses
          </Link>
          </li>
          <li>
          <Link to="/attendance-logs" className="flex gap-2 items-center px-2 py-2 rounded-lg">
            <img src={attendanceIcon} alt="training icon" className="w-8" />Attendance Logs
          </Link>
          </li>
        </ul>
      </nav>
    </div>
    
  )
}

export default SideBar