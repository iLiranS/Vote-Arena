import React from 'react'
import { bracketMatch } from './BracketModels'
import MatchItem from './MatchItem'

const Match: React.FC<{ matchProps: bracketMatch, onActiveItemChange: (id: string) => void, activeItemTitle: string, }> = ({ matchProps, activeItemTitle, onActiveItemChange, }) => {

    return (
        <li className={`flex flex-col border-[1px] relative border-r-0`}>
            <MatchItem winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.first} />
            <MatchItem winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.second} />
            <div className='absolute w-[34px] h-[1px] top-1/2 -translate-y-1/2 left-0 -translate-x-full bg-border'></div>
            <div className='absolute top-1/2 left-1/2 w-full bg-border h-[1px] -translate-x-1/2 -translate-y-1/2'></div>
        </li>
    )
}

export default Match