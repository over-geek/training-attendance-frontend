import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import logoImg from '../assets/images/logo_icps.png'
import trainingIcon from '../assets/images/training.png'
import dashboardIcon from '../assets/images/dashboard.png'

const SideBar = () => {
  return (
    <div className='w-1/6 border-x pt-4 px-5 h-full flex-shrink-0'>
      <div className='w-full flex justify-start items-center gap-5'>
        <img src={logoImg} alt="logo" className='w-32'/>
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
        </ul>
      </nav>
    </div>
    
  )
}

export default SideBar