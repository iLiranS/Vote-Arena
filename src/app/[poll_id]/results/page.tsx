import PollResultItem from '@/components/poll/PollResultItem';
import GenreLink from '@/components/Polls/GenreLink';
import { getPoll } from '@/lib/fetchUtils';
import { optionPollForm, PollResultOption } from '@/lib/models';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const revalidate = 300; // every 5 minutes.
export async function generateMetadata({ params }: { params: { poll_id: string } }): Promise<Metadata> {
    const id = params.poll_id;
    const poll = await (getPoll(id));
    if (!poll) return { title: 'Vote-Arena - Poll Not found' }
    return {
        title: `Vote Arena - ${poll.title} results`,
        description: `results of ${poll.title} , ${poll.type}`
    }
}

const page = async ({ params }: { params: { poll_id: string } }) => {
    const poll = await getPoll(params.poll_id);
    if (!poll || !poll.options) return notFound();
    const totalPoints = poll.totalScore.reduce((a, b) => a + b);


    const pollResultItems: PollResultOption[] = (
        typeof poll.options === 'string'
            ? JSON.parse(poll.options)
            : poll.options
    )
        .map((option: optionPollForm, index: number) => ({
            ...option,
            score: poll.totalScore[index],
            winCount: poll.winsCount[index],
            percent: poll.type === 'VOTE' ? parseFloat(((poll.totalScore[index] / totalPoints) * 100).toFixed(2)) : parseFloat((poll.totalScore[index] / poll.totalDuels[index] * 100).toFixed(2))
        }))
        .sort(poll.type === 'VOTE' ? ((a: PollResultOption, b: PollResultOption) => b.score - a.score) : ((a: PollResultOption, b: PollResultOption) => {
            // First, sort by winCount in descending order
            if (b.winCount !== a.winCount) {
                return b.winCount - a.winCount;
            }
            // If winCount is the same, sort by percent in descending order
            return b.percent - a.percent;
        }));




    return (
        <div className='flex flex-col gap-2 mx-auto w-[600px] p-2 sm:p-0 max-w-full'>
            <h1 className='text-center text-2xl font-semibold'>{poll.title}</h1>
            <section className=' flex justify-between items-center gap-2'>
                <p className='text-sm text-center'> <span className='opacity-70'>Results of</span> <span className='text-violet-400 font-bold mx-1'>{poll.submissions}</span> <span className='opacity-70'>submissions</span></p>
                <GenreLink className='bg-card' genre={poll.genre} />
            </section>
            <p className='opacity-50 text-xs'>results might take up to<span className='font-semibold'>5</span> minutes to be updated.</p>
            <ol className='flex flex-col gap-2 pb-2'>
                {pollResultItems.map((el, index) => <PollResultItem tourny={poll.type === 'TOURNY'} index={index} submissions={poll.submissions} key={el.title} resultOption={el} />)}
            </ol>
        </div>
    )
}

export default page