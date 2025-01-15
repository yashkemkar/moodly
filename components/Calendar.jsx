'use client'
import React, { useState } from 'react'
import { gradients, baseRating, demoData } from '@/utils'

// Created array to check against for dynamic calendar creation as per day on first date of the month.
const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props
    // Need to track months, years so that user can toggle through different months (and eventually different years)
    const today = new Date()
    const currMonth = now.getMonth()
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currMonth])
    const [selectedYear, setSelectedYear]=useState(now.getFullYear())

    const numericMonth = Object.keys(months).indexOf(selectedMonth)


    // pulling out only the data for the month from complete data which was parsed into calendar from dashboard.
    const data = completeData?.[selectedYear]?.[numericMonth] || {}

    function handleIncrementMonth(val) {
        //value +1 -1
        //if user hit the bounds of the months, then it adjusts the year displayed.
    }
    
    
    // Create a new date object for that year, that specific month, and then the next line will figure out the first day of that month, and following that is the number of days in th emonth.
    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
    const firstDayOfMonth = monthNow.getDay()
    const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()
    
    // Calendar display logic
    const daysToDisplay = firstDayOfMonth + daysInMonth
    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

    return (
        <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10 '>
            {[...Array(numRows).keys()].map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

                            // determine whether any days of the week should be blank, depending on what day is the first of the month.
                            let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                            let isToday = dayIndex === now.getDate()

                            if (!dayDisplay) {
                                return (
                                    <div className='bg-white' key={dayOfWeekIndex} />
                                )
                            }

                            let color = demo ?
                                gradients.green[baseRating[dayIndex]] :
                                dayIndex in data ?
                                    gradients.green[data[dayIndex]] :
                                    'white'

                            return (
                                <div style={{ background: color }} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 py-4 sm:py-6 justify-between rounded-lg font-semibold ' + (isToday ? ' border-green-500' : 'border-green-100') + (color === 'white' ? ' text-green-500' : ' text-white')} key={dayOfWeekIndex}>
                                    <p>{dayIndex}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}

        </div>
    )
}
