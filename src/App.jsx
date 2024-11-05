import './App.css'
import { Outlet } from 'react-router-dom'
import {Toaster} from "@/components/ui/toaster"
import SideBar from './components/SideBar'
import TopNav from './components/TopNav'

function App() {

    return (
        <div className='flex h-screen overflow-hidden'>
            <SideBar />
            <main className='flex flex-col w-full overflow-hidden'>
                {/*<TopNav />*/}
                <div className='flex-grow overflow-hidden'>
                    <Outlet />
                </div>
                <Toaster />
            </main>
        </div>
    )
}

export default App
