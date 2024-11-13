import './App.css'
import { Outlet } from 'react-router-dom'
import {Toaster} from "@/components/ui/toaster"
import SideBar from './components/SideBar'
import {useLocation} from "react-router-dom";

function App() {
  const location = useLocation();

  const isEvaluationPage = location.pathname.includes("/evaluation");

    return (
        <div className='flex h-screen overflow-hidden'>
          { !isEvaluationPage && <SideBar/>}
            <main className='flex flex-col w-full overflow-hidden'>
                <div className='flex-grow overflow-hidden'>
                    <Outlet />
                </div>
                <Toaster />
            </main>
        </div>
    )
}

export default App
