import ButtonLoading from '@/components/ui/ButtonLoading'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <div className='w-fit mx-auto relative pb-2  flex flex-col gap-2 '>
            <Skeleton className='h-10 w-40' />
            <ButtonLoading className='w-fit' placeholder='Loading Poll' />
        </div>
    )
}

export default loading