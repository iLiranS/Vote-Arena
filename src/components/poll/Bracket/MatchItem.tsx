import { optionPollForm } from '@/lib/models';
import Link from 'next/link';
import React from 'react'

const MatchItem: React.FC<{ itemProps: optionPollForm, winnerTitle: string, activeItemTitle: string, onActiveItemChange: (id: string) => void, index: number, isLastStage: boolean }> = ({ itemProps, onActiveItemChange, activeItemTitle, winnerTitle, index, isLastStage }) => {
    const didLose = winnerTitle.length > 0 && winnerTitle !== itemProps.title;
    const isActive = activeItemTitle === itemProps.title;

    const itemHoverHandler = () => {
        if (itemProps.title === 'TBD') return;
        onActiveItemChange(itemProps.title)
    }
    const itemHoverOutHandler = () => {
        onActiveItemChange('')
    }

    return (
        <div onMouseEnter={itemHoverHandler} onMouseLeave={itemHoverOutHandler}
            className={` w-40 aspect-[4/1] border-[2px] ${didLose && 'bg-slate-600/50 opacity-70'} ${index === 0 && 'border-b-0'} ${index === 1 && 'border-t-0'}   ${isActive && 'bg-violet-500'} relative`}>
            <section className={`flex items-center   w-full h-full`}>
                <ItemSection title={itemProps.title} src={itemProps.src.length > 1 ? itemProps.src : undefined} isActive={isActive} votes={itemProps.votes} />
            </section>
            {!isLastStage && !didLose &&
                <div className={`absolute h-[2px]  w-[calc(100%_+28px)] left-0 ${isActive && winnerTitle.length > 1 ? 'bg-violet-500 z-10' : 'bg-border'} ${index === 0 ? 'bottom-0' : 'top-0'}`}></div>
            }

        </div>
    )
}

const ItemSection: React.FC<{ title: string, votes?: number, src?: string, isActive: boolean }> = ({ title, votes, src, isActive }) => {
    return <div className={`grid pl-2 justify-between items-center gap-2 h-full w-full truncate ${votes ? 'grid-cols-[1fr,max-content]' : 'grid-cols-1'}`}>
        {src ? <Link href={src} className='truncate'>{title}</Link> : <p className='truncate'>{title}</p>}
        {votes && <section className={` ${isActive ? 'bg-violet-500 border-l-2 border-violet-700' : 'bg-border'} grid place-items-center w-8 h-full text-sm`}>{votes}</section>}
    </div>
}

export default MatchItem