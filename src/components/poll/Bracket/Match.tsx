import React from 'react'
import { bracketMatch } from './BracketModels'
import MatchItem from './MatchItem'

const Match: React.FC<{ matchProps: bracketMatch, onActiveItemChange: (id: string) => void, activeItemTitle: string, prevStageMargin: number, stage: number, isLastStageMatch?: boolean }> = ({ matchProps, activeItemTitle, onActiveItemChange, prevStageMargin, stage, isLastStageMatch }) => {

    const isFirstItemActive = activeItemTitle === matchProps.first.title;
    const isSecondItemActive = activeItemTitle === matchProps.second.title;
    // const isItemActive = isFirstItemActive || isSecondItemActive
    // const isLoserHovered = matchProps.winnerTitle === activeItemTitle;

    return (
        <li className={`relative flex flex-col`}>
            <MatchItem index={0} isLastStage={isLastStageMatch ?? false} winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.first} />
            <MatchItem index={1} isLastStage={isLastStageMatch ?? false} winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.second} />

            {/* <div className={`absolute top-1/2 bg-border  h-[2px] -translate-y-1/2 ${stage === 0 && !isLastStageMatch && 'left-0 w-[calc(100%_+26px)]'} ${stage !== 0 && !isLastStageMatch && ' left-0 w-[calc(100%_+26px)]'} ${isLastStageMatch && 'left-0 w-full'}`}></div> */}

            {stage != 0 &&
                <>
                    {/* upper part */}
                    <div className={`absolute top-1/4 -translate-y-1/2 h-[2px] w-[24px] -translate-x-full ${isFirstItemActive ? 'bg-violet-500' : 'bg-border'} `}></div>
                    <div style={{ height: (prevStageMargin / 2) + 20 + 'px', translate: `0 calc(-100% + 20px)` }} className={`absolute -left-6 w-[2px] ${isFirstItemActive ? 'bg-violet-500' : 'bg-border'} top-0 `}></div>

                    {/* lower part */}
                    <div className={`absolute bottom-1/4 -translate-y-1/2 h-[2px] w-[24px] -translate-x-full ${isSecondItemActive ? 'bg-violet-500' : 'bg-border'}`}></div>
                    <div style={{ height: (prevStageMargin / 2) + 22 + 'px', translate: `0 calc(100% - 22px)` }} className={`absolute -left-6 w-[2px] ${isSecondItemActive ? 'bg-violet-500' : 'bg-border'} bottom-0 `}></div>
                </>
            }
        </li>
    )
}

export default Match