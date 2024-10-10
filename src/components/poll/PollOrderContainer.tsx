import { optionPollForm } from '@/lib/models'
import { Reorder } from 'framer-motion'
import VoteItem from './VoteItem'

const PollOrderContainer: React.FC<{ options: optionPollForm[], onChange: (options: optionPollForm[]) => void, topAmount: number }> = ({ options, onChange, topAmount }) => {
    return (
        <Reorder.Group className='flex flex-col gap-2 self-center  w-full max-w-[600px] px-6 sm:px-0 relative z-10' as='ol' axis='y' values={options} onReorder={onChange}>
            {options.map((option, index) => <VoteItem topAmount={topAmount} top={index + 1} key={JSON.stringify(option)} option={option} />)}
        </Reorder.Group>
    )
}

export default PollOrderContainer