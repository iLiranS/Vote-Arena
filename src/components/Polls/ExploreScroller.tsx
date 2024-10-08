'use client'
import { containerVariant, itemVariant, pollsFetchModel, previewPoll } from '@/lib/models'
import React, { useState } from 'react'
import PollPreview from './PollPreview';
import { Button } from '../ui/button';
import ButtonLoading from '../ui/ButtonLoading';
import { getPolls } from '@/lib/fetchUtils';
import { motion } from 'framer-motion'





const ExploreScroller: React.FC<{ initialPolls: previewPoll[], totalMatchCount: number, searchOptions: pollsFetchModel }> = ({ initialPolls, totalMatchCount, searchOptions }) => {
    const [currentSkip, setCurrentSkip] = useState(20);
    const [polls, setPolls] = useState(initialPolls);
    const [isFetching, setIsFetching] = useState(false);



    async function fetchHandler() {
        setIsFetching(true);
        const updatedSearchOptions: pollsFetchModel = { ...searchOptions, skip: currentSkip };
        try {
            const polls = await getPolls(updatedSearchOptions);
            setPolls(prev => {
                const fornow = [...prev, ...polls];
                return fornow;
            })
            setCurrentSkip(prev => prev + polls.length);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setIsFetching(false);
        }
    }

    return (
        <div className='w-full h-max flex flex-col gap-4 p-2 small:p-4'>
            <p> <span className='opacity-70'>showing</span> <span className='text-violet-400 font-semibold'> {polls.length}/{totalMatchCount}</span> <span className='opacity-70'>results</span></p>
            <motion.ul
                variants={containerVariant}
                initial="hidden"
                animate="show"
                className=' w-full h-max gap-4 grid items-start grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
                {polls.map((poll) => <motion.li variants={itemVariant} key={poll.id}> <PollPreview poll={poll} /></motion.li>)}
            </motion.ul>
            {polls.length < totalMatchCount &&
                <>
                    {!isFetching ? <Button onClick={fetchHandler} className={`w-fit border-2 border-popover self-center`}>Load more</Button>
                        :
                        <ButtonLoading className={`w-fit border-2 border-popover self-center`} placeholder='Loading' />
                    }
                </>
            }

        </div>
    )
}

export default ExploreScroller