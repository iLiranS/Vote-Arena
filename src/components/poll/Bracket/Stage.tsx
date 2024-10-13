import React from 'react'
import Match from './Match'
import { bracketMatch } from './BracketModels'

const calculateStageGap = (stage: number, baseGap: number, matchHeight: number) => {
    if (stage < 0) return baseGap;
    return stage === 0 ? baseGap : (matchHeight + baseGap) * Math.pow(2, stage) - matchHeight;
}

const Stage: React.FC<{
    stageMatches: bracketMatch[], name: string, activeItemTitle: string, onActiveItemChange: (id: string) => void
    currentStage: number
}> = ({ stageMatches, name, onActiveItemChange, activeItemTitle, currentStage }) => {

    const matchHeight = 80; // Height of each match item
    const baseGap = 16; // Base gap between matches

    // Translate calculation for the current stage
    const translate = currentStage === 0
        ? 0
        : Math.pow(2, currentStage - 1) * (matchHeight + baseGap) - (matchHeight / 2 + baseGap / 2);

    // Gap calculation for the current stage
    const gap = calculateStageGap(currentStage, baseGap, matchHeight)




    return (
        <div className='flex flex-col gap-2 '>

            <p className='text-center'>{name}</p>
            <ul style={{ translate: `0 ${(translate)}px`, gap: `${gap}px` }} className='flex relative flex-col justify-center h-max  w-max '>
                {stageMatches.map((match, index) => <Match isLastStageMatch={stageMatches.length === 1} stage={currentStage} prevStageMargin={calculateStageGap(currentStage - 1, baseGap, matchHeight)} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} key={match.first.title + match.second.title + index} matchProps={match} />)}
            </ul>

        </div >
    )
}

export default Stage