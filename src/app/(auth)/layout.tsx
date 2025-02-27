import React from 'react'

type Props = {
    children : React.ReactNode
}

function Layout({children}: Props) {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        {children}
    </div>
  )
}

export default Layout