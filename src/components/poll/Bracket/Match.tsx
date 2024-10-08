import React from 'react'
import { bracketMatch } from './BracketModels'
import MatchItem from './MatchItem'

const Match: React.FC<{ matchProps: bracketMatch, onActiveItemChange: (id: string) => void, activeItemTitle: string }> = ({ matchProps, activeItemTitle, onActiveItemChange }) => {

    return (
        <li className=' flex flex-col gap-1'>
            <MatchItem winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.first} />
            <MatchItem winnerTitle={matchProps.winnerTitle} activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} itemProps={matchProps.second} />
        </li>
    )
}

export default Match