import React, { Suspense } from 'react'
import CardContainer from '../ui/CardContainer'

import { FaFire } from "react-icons/fa";
import PopularCarousel from './PopularCarousel';
import { Skeleton } from '../ui/skeleton';




const PopularPolls = () => {
    return (
        <CardContainer className='w-full  relative flex flex-col gap-4 pt-4'>
            <section className=' w-fit  flex self-center gap-2  relative opacity-80'>
                <div className='flex gap-2 items-center z-10 '>
                    <p>Trending</p>
                    <FaFire />
                </div>
            </section>

            <div className='relative h-[250px] w-full'>
                <Suspense fallback={<Skeleton className="h-full  w-full"></Skeleton>}>
                    <PopularCarousel />
                </Suspense>
            </div>


        </CardContainer>
    )
}


export default PopularPolls