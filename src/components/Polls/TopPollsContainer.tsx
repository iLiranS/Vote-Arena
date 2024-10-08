import TopPolls from "@/components/Polls/TopPolls";
import { pollsFetchModel, previewPoll } from '@/lib/models';

// revliadtion set up 2 hours .
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

// kind of heavy function, 3 requests so revlidate not often.
const getTopPolls = async (): Promise<previewPoll[][]> => {
    try {

        const dayList = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls?skip=${dayFetchOptions.skip}&take=${dayFetchOptions.take}&orderby=${dayFetchOptions.orderby}&date=${dayFetchOptions.date}`, { next: { revalidate: 7200 } });
        if (!dayList.ok) throw new Error("failed fetching daily list");
        const dayListRes: previewPoll[] = await dayList.json();

        const weekList = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls?skip=${weekFetchOptions.skip}&take=${weekFetchOptions.take}&orderby=${weekFetchOptions.orderby}&date=${weekFetchOptions.date}`, { next: { revalidate: 7200 } });
        const weekListRes: previewPoll[] = await weekList.json();
        if (!weekList.ok) throw new Error("failed fetching weekly list");

        const monthList = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls?skip=${monthFetchOptions.skip}&take=${monthFetchOptions.take}&orderby=${monthFetchOptions.orderby}&date=${monthFetchOptions.date}`, { next: { revalidate: 7200 } });
        const monthListRes: previewPoll[] = await monthList.json();
        if (!monthList.ok) throw new Error("failed fetching monthly list");

        return [dayListRes, weekListRes, monthListRes]
    }
    catch (err) {
        console.error(err);
        return []
    }
}


const TopPollsContainer = async () => {
    const topPollsLists = await getTopPolls();

    return (

        <TopPolls daily={topPollsLists[0]} weekly={topPollsLists[1]} monthly={topPollsLists[2]} />
    )
}

export default TopPollsContainer