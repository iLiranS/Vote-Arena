import PollPage from '@/components/poll/PollPage';
import { getPoll } from '@/lib/fetchUtils';
import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

const prisma = new PrismaClient()


export async function generateMetadata({ params }: { params: { poll_id: string } }): Promise<Metadata> {
    const id = params.poll_id;
    const poll = await (getPoll(id));
    if (!poll) return { title: 'Vote-Arena - Poll Not found' }
    return {
        title: `Vote Arena - ${poll.title}`,
        description: `${poll.title} , genre : ${poll.genre} with type of ${poll.type}`
    }
}
// generate all available routes
export async function generateStaticParams() {
    const polls = await prisma.poll.findMany({ select: { id: true } });
    return polls.map((poll) => ({
        slug: poll.id,
    }))
}

const page = async ({ params }: { params: { poll_id: string } }) => {
    const poll = await getPoll(params.poll_id);
    if (!poll) return notFound(); // in case of failure
    return (
        <PollPage poll={poll} />
    )
}

export default page