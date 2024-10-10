import React from 'react'

import { getPolls } from '@/lib/fetchUtils';
import { PageProps, pollsFetchModel } from '@/lib/models';
import { Genre } from '@prisma/client';
import { notFound } from 'next/navigation';
import ExploreScroller from '@/components/Polls/ExploreScroller';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


// it will cache genres but it will not cache genres+search or searc without genre
const page = async ({ searchParams }: PageProps) => {



    const genre = (searchParams.genre ? (searchParams.genre as string).toUpperCase() as Genre : undefined) // might be undefined

    // check if genre is real
    if (genre && !Object.keys(Genre).includes(genre)) return notFound();
    const search = (searchParams.search ?? '') as string;

    const pollsFetchOptions: pollsFetchModel = {
        skip: 0,
        take: 20,
        orderby: 'popular',
        date: 'all',
        genre: genre,
        match: search
    }

    const revalidateLength = search.length > 1 ? 0 : 900; // if its genre search, 15 minutes, else dynamic
    const { polls, totalPolls } = await getPolls(pollsFetchOptions, revalidateLength);
    return (
        <>
            {totalPolls > 0 ? <ExploreScroller searchOptions={pollsFetchOptions} initialPolls={polls} totalMatchCount={totalPolls} /> :
                <div className='flex justify-center flex-col gap-4 text-center w-fit mx-auto'>
                    <p className='opacity-80'>No Polls found 🥺</p>
                    <Button asChild>
                        <Link href={'/'}>Click to go back home</Link>
                    </Button>
                </div>
            }
        </>

    )
}

export default page