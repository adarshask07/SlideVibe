'use client'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    user : User
}

const NewProjectButton = ({user}: Props) => {
    const router = useRouter() ;

  return (
    <Button
    
    className='rounded-lg font-semibold'
    disabled={ user.subscription ? false : true }
    // onClick={() => router.push('/new-project')} WIP 
    >
        <Plus/>
        New Project
    </Button>
  )
}

export default NewProjectButton