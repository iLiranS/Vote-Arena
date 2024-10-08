import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <div className="w-full h-[400px] bg-card rounded-md p-2 flex flex-col gap-2">
            <Skeleton className='h-5 w-10 bg-popover' />

            <Skeleton className='h-10 w-full bg-popover' />

            <Skeleton className='h-5 w-10 bg-popover' />

            <Skeleton className=' h-10 w-full bg-popover' />

            <Skeleton className='h-5 w-10 bg-popover' />

            <Skeleton className=' h-[36px] w-32 bg-popover' />

            <Skeleton className='h-5 w-10 bg-popover' />

            <Skeleton className=' h-[36px] w-32 bg-popover' />

            <Skeleton className='h-5 w-10 bg-popover' />

            <Skeleton className='h-10 w-full bg-popover' />

            <Skeleton className='h-5 w-10 bg-popover' />

            <Skeleton className='h-10 w-24 self-end bg-popover' />
        </div>
    )
}

export default Loading