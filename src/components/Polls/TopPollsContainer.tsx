import TopPolls from "@/components/Polls/TopPolls";
import { getPolls } from "@/lib/fetchUtils";
import { pollsFetchModel } from '@/lib/models';

// revliadtion set up 20 minutes for the page itself
// but the actual reequests are revalidating depends on the time i gave them.

const dayFetchOptions: pollsFetchModel = {
    skip: 0,
    take: 10,
    orderby: 'popular',
    date: 'day'
}
const weekFetchOptions: pollsFetchModel = {
    skip: 0,
    take: 10,
    orderby: 'popular',
    date: 'week'
}
const monthFetchOptions: pollsFetchModel = {
    skip: 0,
    take: 10,
    orderby: 'popular',
    date: 'month'
}



const TopPollsContainer = async () => {
    const dailyPolls = (await getPolls(dayFetchOptions, 1200)).polls; // every 20 minutes
    const weeklyPolls = (await getPolls(weekFetchOptions, 14400)).polls; // every 4 hours
    const monthlyPolls = (await getPolls(monthFetchOptions, 86400)).polls; // every day

    return (

        <TopPolls daily={dailyPolls} weekly={weeklyPolls} monthly={monthlyPolls} />
    )
}

export default TopPollsContainer