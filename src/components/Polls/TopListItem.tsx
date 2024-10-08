import React from 'react'
import PollPreview from './PollPreview'
import { CiMedal } from "react-icons/ci";
import { itemVariant, previewPoll } from '@/lib/models';
import { motion } from 'framer-motion'


const TopListItem: React.FC<{ position: number, poll: previewPoll }> = ({ position, poll }) => {

    let positionContent: JSX.Element;
    switch (position) {
        case 1:
            positionContent = <CiMedal className='fill-amber-400 dark:fill-yellow-400' />
            break;
        case 2:
            positionContent = <CiMedal className='fill-zinc-400' />
            break;
        case 3:
            positionContent = <CiMedal className='fill-amber-600' />
            break;
        default:
            positionContent = <p className='text-sm opacity-60'>{position}</p>
    }

    return (
        <motion.li variants={itemVariant} key={poll.id + position} className='flex items-center gap-2  max-w-[320px] mx-auto w-full h-fit'>
            <section className='w-8 justify-center flex'>
                <div className=' text-xl  rounded-full aspect-square w-full grid place-items-center'>
                    {positionContent}
                </div>
            </section>
            <PollPreview poll={poll} />
        </motion.li>
    )
}

export default TopListItem