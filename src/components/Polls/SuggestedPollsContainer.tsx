import SuggestedPolls from './SuggestedPolls'
import { pollsFetchModel, previewPoll } from '@/lib/models';

// revalidation set to 10 minutes.
const recentFetchOptions: pollsFetchModel = {
    skip: 0,
    take: 10,
    orderby: 'newest',
    date: 'all'
}
const getRecentPolls = async (): Promise<previewPoll[]> => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls?skip=${recentFetchOptions.skip}&take=${recentFetchOptions.take}&orderby=${recentFetchOptions.orderby}&date=${recentFetchOptions.date}`, { next: { revalidate: 600 } });
        const polls: previewPoll[] = await res.json();
        return polls;
    }
    catch (err) {
        console.error(err);
        return []
    }
}

const SuggestedPollsContainer = async () => {
    const recentPolls = await getRecentPolls();
    return (
        <SuggestedPolls recentPolls={recentPolls} />
    )
}

export default SuggestedPollsContainer