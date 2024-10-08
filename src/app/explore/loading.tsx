import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <div className='flex flex-col gap-4 w-full h-full p-2'>
            <Skeleton className='h-6 w-28' />
            <ul className=' w-full h-max gap-4 grid items-start grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
                {Array.from({ length: 10 }).map((el, index) =>
                    <li className=' h-[125px] rounded-md w-full max-w-[300px]  relative  flex flex-col mx-auto'
                        key={index}>
                        <Skeleton className='h-full w-full' />
                    </li>)}

            </ul>
        </div>
    )
}

export default loading