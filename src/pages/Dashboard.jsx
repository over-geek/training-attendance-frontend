import React, { useEffect, useState } from 'react'
import { Button }from "../components/ui/button.tsx"
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Link } from "react-router-dom"
import LineChart from '@/components/dashboard/LineChart.jsx'
import ColumnBar from '@/components/dashboard/ColumnBar.jsx'

import { fetchDashboardMetrics, fetchPendingTrainings } from '@/services/utils'
import Donut from '@/components/dashboard/Donut.jsx'
import { Separator } from '@/components/ui/separator.tsx'
import Notification from '@/components/dashboard/Notification.jsx'
import RecentActivity from '@/components/dashboard/RecentActivity.jsx'


const Dashboard = () => {
  const [metrics, setMetrics] = useState(null)
  const [pendingAttendees, setPendingAttendees] = useState([])

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    const response = await fetchDashboardMetrics()
    const pendingAttendeesData = await fetchPendingTrainings();
    setMetrics(response)
    setPendingAttendees(pendingAttendeesData)
    console.log("dashboard metrics: ", response)
  }

  return (
      <div className='px-8 h-full flex flex-col gap-3 bg-gray-100 py-5'>
        <div>
          <h3 className='font-semibold'>Dashboard Overview</h3>
        </div>
        <div className='flex gap-5 grow'>
          <div className='w-2/3 flex flex-col gap-5'>
            <div className='flex flex-col gap-3 flex-none'>
              <div className='flex gap-5'>
                <div className='flex flex-col gap-4 p-5 br-2 w-64 h-36 bg-white ring-1 ring-inset ring-gray-100 shadow-lg'>
                  <p>Total completed trainings</p>
                  <p className='text-3xl'>{metrics?.totalCompletedTrainings ?? 0}</p>
                </div>
                <div className='flex flex-col gap-4 p-5 br-2 w-64 h-36 bg-white ring-1 ring-inset ring-gray-100 shadow-lg'>
                  <p>Average no. of Attendees</p>
                  <p className='text-3xl'>{metrics?.averageAttendees ?? 0}</p>
                </div>
                <div className='flex flex-col gap-4 p-5 br-2 w-64 h-36 bg-white ring-1 ring-inset ring-gray-100 shadow-lg'>
                  <p>Average no. of Evaluations</p>
                  <p className='text-3xl'>{metrics?.averageResponses ?? 0}</p>
                </div>
              </div>
            </div>
            <div className='flex h-64 gap-3'>
              <div className="h-full w-full bg-white br-2 ring-1 ring-inset ring-gray-100 shadow-lg">
                {metrics?.twelveMonths ? (
                  <ColumnBar data={metrics.twelveMonths} />
                ) : (
                  <p className="text-center text-gray-500">Loading data...</p>
                )}
              </div>
            </div>
            <div className='flex br-1 grow gap-4'>
              <div className='w-1/2 flex br-2 px-3 py-2 flex-col bg-white ring-1 ring-inset ring-gray-100 shadow-lg'>
                <div>
                  <p className='font-semibold'>Overall Training Rating Breakdown</p> 
                </div>
                <div className='grow'>
                  <Donut data={metrics?.ratings} />
                </div>
              </div>
              <div className='w-1/2 px-3 py-2 flex flex-col gap-3 br-2 bg-white ring-1 ring-inset ring-gray-100 shadow-lg'>
                <div>
                  <p className='font-semibold'>Most Attended Trainings</p>
                  <ul>
                    {metrics?.highestAttendance.map((training, index) => (
                      <li key={index}>
                        <div className='flex justify-between px-2'>
                          <div className='text-gray-500'>
                            {training?.agenda}
                          </div>
                          <div className='text-green-500'>{training?.attendeeCount}</div>
                        </div>
                        {index !== metrics.highestAttendance.length - 1 && (
                          <Separator className='my-2'/>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='font-semibold'>Least Attended Training</p>
                  <div className='flex justify-between px-2'>
                    <div className='text-gray-500'>{metrics?.lowestAttendance?.agenda}</div>
                    <div className='text-red-500'>{metrics?.lowestAttendance?.attendeeCount}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/3 px-3 py-3 br-2 flex flex-col gap-5 bg-white ring-1 ring-inset ring-gray-100 shadow-md'>
            <p className='font-semibold'>Recent Activity</p>
            <div>
              <RecentActivity pendingTrainings={pendingAttendees} />
            </div>
          </div>
        </div>
      </div>

  )
}

export default Dashboard