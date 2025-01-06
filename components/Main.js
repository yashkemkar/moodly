import React from 'react'

// functional component Main will emulate the behaviour of <main> tags, but can be reused anywhere in the app.
export default function Main(props) {
    const { children } = props
    return (
        <main className='flex-1'>
            {children}
        </main>
    )
}
