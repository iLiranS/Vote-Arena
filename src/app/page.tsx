import PopularPolls from "@/components/Polls/PopularPolls";
import Link from "next/link";
import Illustration1 from '@/assets/Illustration1'
import Illustration2 from '@/assets/Illustration2'
import { IoCreateOutline } from "react-icons/io5";
import PollGenreList from "@/components/Polls/PollGenreList";
import TopPollsContainer from "@/components/Polls/TopPollsContainer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SuggestedPollsContainer from "@/components/Polls/SuggestedPollsContainer";
import { Button } from "@/components/ui/button";



export default function Home() {
  return (

    <div className=" w-full h-max lg:h-full flex flex-col p-2 pt-0">

      <div className="flex justify-center  w-full h-max items-start overflow-hidden heroDiv">
        <div className="absolute hidden h-60 left-0 aspect-square lg:block">
          <Illustration1 className=' -translate-y-[20%] -translate-x-[140px] xl:-translate-x-12  lg:scale-[0.35] scale-[0.25]' />
        </div>
        <section className="flex flex-col h-full w-max max-w-full mx-auto justify-center  gap-1 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center">The Hottest <br /> <span className="text-red-500">Polling</span> Platform</h1>
          {/* <h1 className="text-4xl md:text-6xl font-bold text-center"> </h1> */}
          <section className=" shadow-red-500 shadow-md text-sm rounded-md bg-popover/80 w-fit px-2 py-1 self-center my-2 "> <p className="opacity-80">Create, Share, and Discover Engaging Polls!</p></section>
          <ol className="olTest  gap-1 flex flex-col mt-2 md:pl-0 pl-6">
            <li ><p className="inline" ><span className="font-semibold">Create</span> <span className="opacity-70">explore and share your favorite polls!</span> </p></li>
            <li ><p className="inline"><span className="font-semibold">Different types </span> <span className="opacity-70">of polls : Tournaments / Tier lists / Ranking and more to come! </span></p></li>
            <li ><p className="inline"> <span className="font-semibold">Results</span>  <span className="opacity-70">page with detailed analytics for each poll.</span> </p></li>
          </ol>
          <div className="flex flex-col items-center gap-2 w-full justify-center mb-6">
            <p className="opacity-60 text-xs">{`Free, easy, and takes a few minutes!`}</p>

            <Button className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 border-2 border-black" asChild>
              <Link href={'/create'}>
                <p>Create a poll</p>
                <IoCreateOutline />
              </Link>
            </Button>
          </div>

        </section>
        <div className=" hidden  w-fit lg:flex justify-end absolute right-0">
          <Illustration2 className=' xl:translate-x-[180px] translate-x-[250px] scale-[0.4] xl:scale-[0.5]' />
        </div>
      </div>

      <div className=" flex flex-col lg:flex-row gap-2 relative">
        <div className="flex flex-col gap-2 w-full">
          <PopularPolls />
          <div className="flex flex-col md:flex-row gap-2">
            <Suspense fallback={<Skeleton className="h-[300px] w-full "></Skeleton>}>
              <SuggestedPollsContainer />
            </Suspense>
            <PollGenreList />
          </div>

        </div>
        <Suspense fallback={<Skeleton className="h-[400px] w-full lg:w-[600px] max-w-full "></Skeleton>}>
          <TopPollsContainer />
        </Suspense>
      </div>

    </div>
  );
}
