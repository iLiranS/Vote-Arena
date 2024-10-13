import React from 'react'
import { bracketMatch } from './BracketModels'
import MatchItem from './MatchItem'

const Match: React.FC<{ matchProps: bracketMatch, onActiveItemChange: (id: string) => void, activeItemTitle: string, prevStageMargin: number, stage: number, isLastStageMatch?: boolean }> = ({ matchProps, activeItemTitle, onActiveItemChange, prevStageMargin, stage, isLastStageMatch }) => {

    return (
        <li className={`relative flex flex-col`}>
            <MatchItem index={0} winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.first} />
            <MatchItem index={1} winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.second} />

            <div className={`absolute top-1/2  bg-border h-[2px] -translate-y-1/2 ${stage === 0 && !isLastStageMatch && 'left-0 w-[calc(100%_+26px)]'} ${stage !== 0 && !isLastStageMatch && ' -left-6 w-[calc(100%_+50px)]'} ${isLastStageMatch && '-left-6 w-[calc(100%_+24px)]'}`}></div>

            <div style={{ height: (prevStageMargin) + 80 + 'px' }} className={`absolute -left-6 w-[2px] bg-border top-1/2 -translate-y-1/2`}></div>

        </li>
    )
}

export default Match