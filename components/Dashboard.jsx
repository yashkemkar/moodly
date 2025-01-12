import React from 'react'

export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: (new Date()).toDateString()
  }
  return (
    <div className='flex flex-col flex-1'>
      <div className='grid grid-cols-1 sm:grid-cols-3'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex}>
              <p>{status}</p>
              <p>{statuses[status]}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}
