import Stage from './Stage'
import { getStageNameByOptionsAmount } from '@/lib/utils';
import { useMemo, useState } from 'react';
import { bracketMatch } from './BracketModels';

const Bracket: React.FC<{ stages: bracketMatch[][], totalOptions: number }> = ({ stages, totalOptions }) => {
    const totalStages = useMemo(() => Math.log2(totalOptions), [totalOptions])
    const stagesNames: string[] = Array.from({ length: totalStages }).map((el, index) => getStageNameByOptionsAmount(totalOptions, index));



    // set 
    const [activeItemTitle, setActiveItemTitle] = useState('');


    const updateActiveIdHandler = (title: string) => setActiveItemTitle(title);

    return (
        <ul className='flex gap-12 w-full h-max p-2 overflow-auto relative'>
            {stages.map((stage, index) => <Stage currentStage={index} activeItemTitle={activeItemTitle} onActiveItemChange={updateActiveIdHandler} name={stagesNames[index]} stageMatches={stages[index]} key={index.toString()} />)}
        </ul>
    )
}

export default Bracket