import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import PollCard from './PollCard'
import { pollsFetchModel } from "@/lib/models";
import { getRandomElementsFromArray } from "@/lib/utils";
import { getPolls } from "@/lib/fetchUtils";

export const revalidate = 7200; // revalidate every 2 hours.

const pollsFetchOptions: pollsFetchModel = {
    skip: 0,
    take: 20,
    orderby: 'popular',
    date: 'week'
}




const PopularCarousel = async () => {
    const trendingPolls = await getPolls(pollsFetchOptions);
    // get up to random 10 out of top 20 of the day.
    const randomizePopular = getRandomElementsFromArray(trendingPolls, 10);
    return (
        <Carousel
            opts={{
                align: "start",
                loop: false,
            }}
            className="w-full max-w-full h-full"
        >
            <CarouselContent>
                {randomizePopular.map((poll, index) => (
                    <CarouselItem key={index} className=" basis-1/2 lg:basis-1/4 h-[250px] w-[20px] rounded-lg ">
                        <PollCard poll={poll} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default PopularCarousel