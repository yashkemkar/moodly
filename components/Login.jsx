import { Fugaz_One } from 'next/font/google'
import React from 'react'
import Button from './Button'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export default function Login(props) {
  const { isAuthenticated } = props
  return (
    <div className={'flex flex-col flex-1 justify-center items-center gap-4'} >
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        {isAuthenticated ? 'Log in' : 'Register'}
      </h3>
      <p>
        You&#39;re one step away!
      </p>
      <input autoFocus placeholder='Email' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-green-700 focus:border-green-700 py-2 sm:py-3 border border-solid border-green-500 rounded-full outline-none'/>
      <input placeholder='Password' type='password' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-green-700 focus:border-green-700 py-2 sm:py-3 border border-solid border-green-500 rounded-full outline-none'
      />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button text='Submit' full/>
      </div>
      <p>Don&#39;t have an account? <span className='text-green-500 text-center'>Sign Up</span></p>
    </div>
  )
}
