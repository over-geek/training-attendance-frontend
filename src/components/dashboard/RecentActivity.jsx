import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button.tsx'
import { Avatar } from '../ui/avatar.tsx'
import { fetchActivityLogs } from '@/services/utils.js'

import { Badge } from '@chakra-ui/react'

const RecentActivity = ({ pendingTrainings }) => {
  const INITIAL_COUNT = 4
  const [count, setCount] = useState(INITIAL_COUNT)
  const [logs, setLogs] = useState([])

  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    const response = await fetchActivityLogs()
    setLogs(response)
  }

  const pickPalette = (name) => {
    const index = name.charCodeAt(0) % colorPalette.length
    return colorPalette[index]
  }

  const handleLoadMore = () => {
    setCount(logs.length)
  }

  return (
    <div>
      <div className='flex flex-col max-h-80 gap-3 overflow-y-auto'>
        {/* {pendingTrainings.slice(0, count).map((item, index) => (
          <div key={`${item.employeeId}-${item.training}-${index}`} className='flex items-center gap-2'>
            <Avatar variant="subtle" name={item.employeeName} colorPalette={pickPalette(item.employeeName)} />
            <div className='flex flex-col'>
              <div>
                <p className='text-sm'>
                  {item.employeeName} missed {item.agenda}
                </p>
              </div>
              <div>
                <span className='text-xs text-gray-500'>{item.timeSinceMissed} ago</span>
              </div>
            </div>
            
          </div>
        ))} */}
        {logs.slice(0, count).map((log, index) => (
          <div key={index} className='flex  flex-col'>
            <div className='flex gap-2'>
              {log.type === 'evaluation_submitted' && (
                <Badge colorPalette="purple" className='px-1 py-1'>Comment</Badge>
              )}
              {(log.type === 'training_started' || log.type === 'training_created' || log.type === 'training_ended') && (
                <Badge colorPalette="green" className='px-1 py-1'>training</Badge>
              )}
              <div>
                <p className='text-sm'>
                  {log.message}
                </p>
              </div>
            </div>
            <div>
              <span className='text-xs text-gray-500'>{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        {count < logs.length && (
          <Button onClick={handleLoadMore} variant="ghost">Load More</Button>
        )}
      </div>
    </div>
  )
}

export default RecentActivity