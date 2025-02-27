import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

import React from 'react'

type Props = {
    children : React.ReactNode 
}

const Layout = async ({children}: Props) => {
    // const recentProjects =await getRecentProjects() ;

    const checkUser = await onAuthenticateUser()
    if(!checkUser.user) redirect('/sign-in')
  return (
    <div>{children}</div>
  )
}

export default Layout