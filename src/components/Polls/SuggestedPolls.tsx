'use client'
import PollPreview from './PollPreview'
import { containerVariant, itemVariant, previewPoll } from '@/lib/models';
import CardContainer from '../ui/CardContainer';
import { MdOutlineAutorenew } from "react-icons/md";
import { motion } from 'framer-motion'



const SuggestedPolls: React.FC<{ recentPolls: previewPoll[] }> = ({ recentPolls }) => {

    return (
        <CardContainer className='gap-2 h-max w-full'>
            <div className='flex gap-2 items-center w-full justify-center opacity-80'>
                <p>Recently</p>
                <MdOutlineAutorenew />
            </div>
            <motion.ul
                variants={containerVariant}
                initial="hidden"
                animate="show"
                className=' w-full h-max gap-2 grid items-start grid-cols-[repeat(auto-fill,minmax(160px,1fr))] small:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
                {recentPolls.map(poll => <motion.li variants={itemVariant} key={poll.id}> <PollPreview poll={poll} /></motion.li>)}
            </motion.ul>
        </CardContainer>
    )
}

export default SuggestedPolls