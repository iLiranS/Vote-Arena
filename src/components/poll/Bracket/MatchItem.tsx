import { optionPollForm } from '@/lib/models';
import React from 'react'

const MatchItem: React.FC<{ itemProps: optionPollForm, winnerTitle: string, activeItemTitle: string, onActiveItemChange: (id: string) => void, index: number }> = ({ itemProps, onActiveItemChange, activeItemTitle, winnerTitle, index }) => {
    const didLose = winnerTitle.length > 0 && winnerTitle !== itemProps.title;
    const isActive = activeItemTitle === itemProps.title;
    return (
        <div onClick={() => { if (itemProps.title === 'TBD') return; onActiveItemChange(itemProps.title) }}
            className={` w-40 aspect-[4/1] border-[2px] ${index === 0 && 'border-b-0'} ${index === 1 && 'border-t-0'} overflow-hidden  ${isActive && 'bg-violet-500'} `}>
            <section className={`flex items-center  ${didLose && 'bg-slate-600/50 opacity-50'} w-full h-full pl-2`}>
                <p className={`truncate ${didLose && 'opacity-60'}`}>{itemProps.title}</p>
                <p>{itemProps.votes ?? ''}</p>
            </section>
        </div>
    )
}

export default MatchItem