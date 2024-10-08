import React from 'react'
import Match from './Match'
import { bracketMatch } from './BracketModels'

const Stage: React.FC<{
    stageMatches: bracketMatch[], name: string, activeItemTitle: string, onActiveItemChange: (id: string) => void
    currentStage: number
}> = ({ stageMatches, name, onActiveItemChange, activeItemTitle, currentStage }) => {

    const matchHeight = 82; // Height of each match item
    const baseGap = 16; // Base gap between matches

    // Translate calculation for the current stage
    const translate = currentStage === 0
        ? 0
        : Math.pow(2, currentStage - 1) * (matchHeight + baseGap) - (matchHeight / 2 + baseGap / 2);

    // Gap calculation for the current stage
    const gap = currentStage === 0
        ? baseGap // For Stage 0, use the base gap directly
        : (matchHeight + baseGap) * Math.pow(2, currentStage) - matchHeight;




    return (
        <div className='flex flex-col gap-2 '>

            <p className='text-center'>{name}</p>
            <ul style={{ translate: `0 ${(translate)}px`, gap: `${gap}px` }} className='flex flex-col justify-center h-max  w-max border-r-[1px]'>
                {stageMatches.map((match, index) => <Match activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} key={match.first.title + match.second.title + index} matchProps={match} />)}
            </ul>

        </div >
    )
}

export default Stage