import React, { useEffect, useState } from 'react'
import { Button }from "../components/ui/button.tsx"
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Link } from "react-router-dom"
import LineChart from '@/components/dashboard/LineChart.jsx'
import ColumnBar from '@/components/dashboard/ColumnBar.jsx'

import { fetchTrainingMetrics } from '@/services/utils'
import Donut from '@/components/dashboard/Donut.jsx'
import { Separator } from '@/components/ui/separator.tsx'


const Dashboard = () => {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    const response = await fetchTrainingMetrics()
    setMetrics(response)
    console.log(response)
  }

  return (
      <div className='py-8 px-8 flex flex-col gap-5 h-full'>
        <div className='flex flex-col gap-3 flex-none'>
          <div>
            <h3 className='font-semibold'>Overview</h3>
          </div>
          <div className='flex gap-5'>
            <div className='flex flex-col gap-4 border p-5 br-2 w-64 h-36 stats-bg-gray-50'>
              <p>Trainings</p>
              <p className='text-3xl'>{metrics?.totalCompletedTrainings ?? 0}</p>
            </div>
            <div className='flex flex-col gap-4 border p-5 br-2 w-64 h-36 stats-bg-teal-25'>
              <p>Average no. Attendees</p>
              <p className='text-3xl'>{metrics?.averageAttendees ?? 0}</p>
            </div>
            <div className='flex flex-col gap-4 border p-5 br-2 w-64 h-36 stats-bg-gray-50'>
              <p>Average no. Evaluations</p>
              <p className='text-3xl'>{metrics?.averageResponses ?? 0}</p>
            </div>
          </div>
        </div>
        <div className='flex h-64 gap-4'>
          <div className="w-2/3 h-full border br-1">
            {metrics?.twelveMonths ? (
              <ColumnBar data={metrics.twelveMonths} />
            ) : (
              <p className="text-center text-gray-500">Loading data...</p>
            )}
          </div>
          <div className='w-1/3 h-full border br-1'></div>
        </div>
        <div className='flex br-1'>
          <div className='px-3 py-3 flex gap-2 w-2/3'>
            <div className='w-1/2'>
              <p className='font-semibold'>Rating Breakdown</p>
              <div>
                <Donut data={metrics?.ratings} /> 
              </div>
            </div>
            <Separator orientation='vertical' />
            <div className='w-1/2 px-2 flex flex-col gap-3'>
              <div>
                <p>Most Attended Trainings</p>
                <ul>
                  {metrics?.highestAttendance.map((training, index) => (
                    <li key={index}>
                      <div className='flex justify-between px-2'>
                        <div className='text-gray-500'>
                          {training.agenda}
                        </div>
                        <div className='text-green-500'>{training.attendeeCount}</div>
                      </div>
                      {index !== metrics.highestAttendance.length - 1 && (
                        <Separator className='my-2'/>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p>Least Attended Training</p>
                <div className='flex justify-between px-2'>
                  <div className='text-gray-500'>{metrics?.lowestAttendance.agenda}</div>
                  <div className='text-red-500'>{metrics?.lowestAttendance.attendeeCount}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/3'></div>
        </div>
      </div>

  )
}

export default Dashboard