import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from "@/components/ui/provider.tsx";
import Dashboard from './pages/Dashboard'
import Trainings from './pages/Training/Trainings.jsx'
import Reports from './pages/Reports'
import Responses from './pages/Responses'
import AttendanceLogs from './pages/AttendanceLogs'
import TrainingsHome from "./pages/Training/TrainingsHome.jsx";
import NewTraining from "./pages/Training/NewTraining.jsx";
import './index.css'
import App from './App.jsx'
import EvaluationPage from "./pages/Evaluation/EvaluationPage.jsx";
import HomePage from "./pages/Evaluation/HomePage.jsx";
import GradingPage from "./pages/Evaluation/GradingPage.jsx";
import QuestionsPage from "./pages/Evaluation/QuestionsPage.jsx";
import OverallPage from "./pages/Evaluation/OverallPage.jsx";
import SuccessPage from './pages/Evaluation/SuccessPage.jsx';
import TrainingDetail from './pages/Training/TrainingDetail.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'trainings', element: <Trainings />, children:[
                    { path: '', element: <TrainingsHome /> },
                    { path: 'new', element: <NewTraining /> },
                    { path: ':id', element: <TrainingDetail /> },
                ] },
            { path: 'reports', element: <Reports /> },
            { path: 'responses', element: <Responses /> },
            { path: 'attendance-logs', element: <AttendanceLogs /> },
            { path: 'evaluation/:token', element: <EvaluationPage />, children: [
                {path: '', element: <HomePage />},
                {path: '1', element: <GradingPage />},
                {path: '2', element: <QuestionsPage />},
                {path: '3', element: <OverallPage />},
                {path: 'success', element: <SuccessPage />}
              ] },
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