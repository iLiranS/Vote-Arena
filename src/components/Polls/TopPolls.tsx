'use client'
import { containerVariant, previewPoll, switcherElementProps } from '@/lib/models'
import React, { useMemo, useState } from 'react'
import { CiTrophy, CiMedal } from "react-icons/ci";
import Switcher from '../ui/Switcher';
import CardContainer from '../ui/CardContainer';
import TopListItem from './TopListItem';
import { RiMedalFill } from "react-icons/ri";
import { motion } from 'framer-motion'



const daySwitch: switcherElementProps = {
    title: 'Day',
    color: 'text-yellow-600',
    icon: <CiMedal />,
    bg_color: 'bg-yellow-500/20'
}
const weekSwitch: switcherElementProps = {
    title: 'Week',
    color: 'text-orange-500',
    icon: <RiMedalFill />,
    bg_color: 'bg-orange-500/20'
}
const monthSwitch: switcherElementProps = {
    title: 'Month',
    color: 'text-red-500',
    icon: <CiTrophy />,
    bg_color: 'bg-red-500/20'
}

const TopPolls: React.FC<{ daily: previewPoll[], weekly: previewPoll[], monthly: previewPoll[] }> = ({ daily, weekly, monthly }) => {

    const [activeIndex, setActiveIndex] = useState(2);

    const updateActiveIndexHandler = (val: number) => setActiveIndex(val);

    const activeListContent = useMemo(() => {
        switch (activeIndex) {
            case 0:
                return daily.map((poll, index) => <TopListItem key={poll.id} position={index + 1} poll={poll} />)
            case 1:
                return weekly.map((poll, index) => <TopListItem key={poll.id} position={index + 1} poll={poll} />)
            default:
                return monthly.map((poll, index) => <TopListItem key={poll.id} position={index + 1} poll={poll} />)


        }
    }, [activeIndex, daily, weekly, monthly])

    const switcherElements: switcherElementProps[] = [daySwitch, weekSwitch, monthSwitch]
    return (
        <div className='h-max grid gap-2 w-full lg:w-[600px] max-w-full lg:px-10'>

            <CardContainer className='flex flex-col gap-2  w-full overflow-x-hidden'>
                <section className='flex flex-col items-center w-full justify-center gap-2'>
                    <h4 className='text-center   opacity-80'>TOP 10</h4>
                    <Switcher elements={switcherElements} activeIndex={activeIndex} selecterFunction={updateActiveIndexHandler} />
                </section>
                <motion.ol
                    key={activeIndex}
                    variants={containerVariant}
                    initial="hidden"
                    animate="show"
                    className=' w-full h-max max-h-[600px] gap-2 grid items-start overflow-y-auto  grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'>
                    {activeListContent}
                </motion.ol>
            </CardContainer>

            {/* <CardContainer className='h-full w-full grid place-items-center'>
                <p>Hall of fame / popular genres</p>
            </CardContainer> */}
        </div>
    )
}

export default TopPolls