'use client'

import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export default function Login() {
  const searchParams = useSearchParams()
  const newParam = searchParams.get('isRegistering')
  const [email, setEmail] = useState('')
  const [isRegistering, setIsRegistering] = useState(newParam)
  const [password, setPassword] = useState('')
  const [authenticating, setAuthenticating] = useState(false)
  const { signup, login } = useAuth()

  async function handleSubmit() {
    if (!email || !password) {
      console.log('Email or Password is missing')
      alert('Email or Password is missing')
      return
    }

    if (password.length < 6) {
      console.log('Password must be more than 6 characters')
      alert('Password must be more than 6 characters')
      return
    }

    setAuthenticating(true)
    
    if (isRegistering) {
      try {
        await signup(email, password)
        console.log('Signing up a new user')
      } catch (err) {
        console.log(err.message)
        alert('User already exists. Try logging in or use a different email.')
      } finally {
        setAuthenticating(false)
      }
    } else {
      try {
        console.log('Logging in existing user')
        await login(email, password)
      } catch (err) {
        console.log(err.message)
        alert('Incorrect email or password. Please try again.')
      } finally {
        setAuthenticating(false)
      }
    }
  }

  return (
    <div className={'flex flex-col flex-1 justify-center items-center gap-4'} >
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        {isRegistering ? 'Register' : 'Log In'}
      </h3>
      <p>
        You&#39;re one step away!
      </p>
      <input value={email} onChange={((e) => {
        setEmail(e.target.value)
      })} autoFocus placeholder='Email' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-green-700 focus:border-green-700 py-2 sm:py-3 border border-solid border-green-500 rounded-full outline-none' />
      <input value={password} onChange={((e) => {
        setPassword(e.target.value)
      })} onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit()
        }
      }} placeholder='Password' type='password' className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-green-700 focus:border-green-700 py-2 sm:py-3 border border-solid border-green-500 rounded-full outline-none'
      />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting...' : 'Submit'} full />
      </div>
      <p>{isRegistering ? 'Already have an account? ' : 'Don\'t have an account? '} <button onClick={() => { setIsRegistering(!isRegistering) }
      } className='text-green-500 text-center'>{isRegistering ? 'Login' : 'Sign Up'}</button></p>
    </div>
  )
}
