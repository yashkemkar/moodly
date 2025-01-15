'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const {signup, login} = useAuth()

  async function handleSubmit() {
    if (!email || !password) {
      console.log('Email or Password is missing')
      return ('Email or Password is missing')
    }

    if (password.length < 6){
      console.log('Password must be more than 6 characters')
      return('Password must be more than 6 characters')

    }

    setAuthenticating(true)

    try {
      if (isRegister) {
        console.log('Signing up a new user')
        await signup(email,password) 
      } else {
        console.log('Logging in existing user')
        await login(email,password)
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      setAuthenticating(false)
    }
  
  }

  return (
    <div className={'flex flex-col flex-1 justify-center items-center gap-4'} >
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        {isRegister ? 'Register' : 'Log In'}
      </h3>
      <p>
        You&#39;re one step away!
      </p>
      <input value={email} onChange={((e) => {
        setEmail(e.target.value)
      })} autoFocus placeholder='Email' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-green-700 focus:border-green-700 py-2 sm:py-3 border border-solid border-green-500 rounded-full outline-none' />
      <input value={password} onChange={((e) => {
        setPassword(e.target.value)
      })} placeholder='Password' type='password' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-green-700 focus:border-green-700 py-2 sm:py-3 border border-solid border-green-500 rounded-full outline-none'
      />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting...' : 'Submit'} full />
      </div>
      <p>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '} <button onClick={() => { setIsRegister(!isRegister) }
      } className='text-green-500 text-center'>{isRegister ? 'Login' : 'Sign Up'}</button></p>
    </div>
  )
}
