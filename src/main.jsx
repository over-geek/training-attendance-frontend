import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from "@/components/ui/provider.tsx";
import Dashboard from './pages/Dashboard'
import Trainings from './pages/Trainings'
import Reports from './pages/Reports'
import Responses from './pages/Responses'
import AttendanceLogs from './pages/AttendanceLogs'
import TrainingsHome from "./pages/TrainingsHome.jsx";
import NewTraining from "./pages/NewTraining.jsx";
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'trainings', element: <Trainings />, children:[
                    { path: '', element: <TrainingsHome /> },
                    { path: 'new', element: <NewTraining /> }
                ] },
            { path: 'reports', element: <Reports /> },
            { path: 'responses', element: <Responses /> },
            { path: 'attendance-logs', element: <AttendanceLogs /> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)