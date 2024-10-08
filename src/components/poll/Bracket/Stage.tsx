import React from 'react'
import Match from './Match'
import { bracketMatch } from './BracketModels'

const Stage: React.FC<{
    stageMatches: bracketMatch[], name: string, activeItemTitle: string, onActiveItemChange: (id: string) => void
}> = ({ stageMatches, name, onActiveItemChange, activeItemTitle }) => {
    return (
        <div className='flex flex-col gap-2 stageContainerBracket'>
            <p className='text-center'>{name}</p>
            <ul className='flex flex-col gap-4 justify-center h-full w-max'>
                {stageMatches.map((match, index) => <Match activeItemTitle={activeItemTitle} onActiveItemChange={onActiveItemChange} key={match.first.title + match.second.title + index} matchProps={match} />)}
            </ul>
            <section className='absolute top-1/2 translate-y-4 w-40 h-[1px] bg-foreground/30'></section>

        </div>
    )
}

export default Stage