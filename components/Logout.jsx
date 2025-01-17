'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Button from './Button'
import { usePathname} from 'next/navigation'


export default function Logout() {
    const { currentUser, logout } = useAuth()
    const pathname = usePathname()

    if (!currentUser) {
        return null
    }

    if (pathname==='/'){
        return (
            <Link href={'/dashboard'}>
                <Button text='Go to dashboard' />
            </Link>
        )
    }

    return (
        <div className='ml-auto flex items-center justify-between'>
            <Link href={'/'}>
                <Button dark full text="Logout" clickHandler={logout} />
            </Link>
        </div>
    )
}
