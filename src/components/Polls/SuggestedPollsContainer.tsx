import { getPolls } from '@/lib/fetchUtils';
import SuggestedPolls from './SuggestedPolls'
import { pollsFetchModel } from '@/lib/models';

// revalidation set to 5 minutes.
const recentFetchOptions: pollsFetchModel = {
    skip: 0,
    take: 10,
    orderby: 'newest',
    date: 'all'
}


const SuggestedPollsContainer = async () => {
    const polls = (await getPolls(recentFetchOptions, 300)).polls ?? []; // 5 mins
    return (
        <SuggestedPolls recentPolls={polls} />
    )
}

export default SuggestedPollsContainer