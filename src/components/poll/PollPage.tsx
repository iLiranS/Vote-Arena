'use client'
import { Poll } from '@prisma/client'
import VotePoll from './VotePoll'
import Link from 'next/link';
import { addPollToLocalStorage, getAnsweredPolls } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { PollSubmissionRequest } from '@/lib/models';
import TournyPoll from './TournyPoll';
import TierlistPoll from './Tierlist/TierListPoll';




const PollPage: React.FC<{ poll: Poll }> = ({ poll }) => {
    const [didAnswer, setDidAnswer] = useState<boolean | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        const userPolls = getAnsweredPolls();
        const hasAnswered = (userPolls.includes(poll.id));
        setDidAnswer(hasAnswered);
        setIsLoading(false);

    }, [poll.id])

    const SubmitHandler = async (values: number[], token: string, winners: number[], updatedDuels?: number[]): Promise<boolean> => {
        try {
            const body: PollSubmissionRequest = {
                results: values,
                id: poll.id,
                token,
                winners,
                duels: updatedDuels ?? undefined
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/result`, {
                method: 'PUT',
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data);
            addPollToLocalStorage(poll.id)
            router.push(`/${poll.id}/results`)
            return true;

        }
        catch (err) {
            console.error(err);
            return false;
        }
    }


    return (
        <div className='w-full relative pb-2  flex flex-col gap-2 '>
            <h2 className='text-center text-xl md:text-2xl font-bold'> {poll.title}</h2>
            {isLoading && <p className='animate-pulse text-center'>Loading...</p>}
            {!isLoading && didAnswer &&
                <section className='self-center text-center mt-8'>
                    <p>You have already answered this poll !</p>
                    <Button asChild={true} variant='link'>
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${poll.id}/results`}> click here to see poll results.</Link>
                    </Button>
                </section>}
            {!didAnswer && !isLoading && poll.type === 'VOTE' ? <VotePoll onSubmit={SubmitHandler} poll={poll} /> : ''}
            {!didAnswer && !isLoading && poll.type === 'TOURNY' ? <TournyPoll onSubmit={SubmitHandler} poll={poll} /> : ''}
            {!didAnswer && !isLoading && poll.type === 'TIER_LIST' ? <TierlistPoll onSubmit={SubmitHandler} poll={poll} /> : ''}
        </div>
    )
}

export default PollPage