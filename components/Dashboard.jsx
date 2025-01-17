'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import Calendar from './Calendar'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Login from './Login'
import Loading from './Loading'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  // function to return statistics to the stats bar
  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
        }
      }
    }
    return { number_of_days: total_number_of_days, average_mood: (sum_moods / total_number_of_days).toFixed(1) }
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`
  }

  const moods = {
    'Barely Alive': '😭',
    'Sad': '😓',
    'Existing': '😐',
    'Good': '😊',
    'Thriving': '😍',
  }

  // setting mood function checks if year, month exists, if so sets mood. Also changes the state of data, userDataObj and writes to firebase database.
  async function handleSetMood(mood) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    try {
      const newData = { ...userDataObj }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }

      newData[year][month][day] = mood

      // update the current  state
      setData(newData)
      // update the global state
      setUserDataObj(newData)
      // update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
    } catch (err) {
      console.log('Failed to set data: ', err.message)
    }

  }

  // on mount check if there is a user or there is an object to load (relating to this user). Depends on both those things being there
  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)

  }, [currentUser, userDataObj])

  // loading state guard clause
  if (loading) {
    return <Loading />
  }

  // current user guard clause
  if (!currentUser) {
    return <Login />
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-3 bg-green-50 text-green-500 rounded-lg p-4'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2' >
              <p className='font-medium capitalize text-xs sm:text-sm truncate '>{status.replaceAll('_', ' ')}</p>
              <p className={'text-base sm:text-lg ' + fugaz.className}>{statuses[status]}{status ==='number_of_days' ? '  🔥': ' '}</p>
            </div>
          )
        })}
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className} >How do you <span className='textGradient'>feel</span> today?</h4>
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button onClick={() => {
              const currentMoodValue = moodIndex + 1
              handleSetMood(currentMoodValue)
            }} className={'p-4 px-5 rounded-2xl greenShadow duration-200 bg-green-50 hover:bg-[#ACE1AF] text-center flex flex-col flex-1 gap-2 items-center '} key={moodIndex}>
              <p className='text-5xl sm:text-6xl md:text-7xl'>{moods[mood]}</p>
              <p className={'text-green-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood}</p>
            </button>
          )
        })}
      </div>
      <div>
        <Calendar completeData={data} handleSetMood={handleSetMood} />
      </div>
    </div>
  )
}
