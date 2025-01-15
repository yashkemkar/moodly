import React from 'react'

export default function Loading() {
  return (
    <div className={'flex flex-col flex-1 justify-center items-center gap-4'} >
        <i className='fa-solid fa-spinner animate-spin text-4xl sm:text-5xl text-green-500'></i>
    </div>
  )
}
