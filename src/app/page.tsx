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



export default function Home() {
  return (

    <div className=" w-full h-max lg:h-full flex flex-col p-2 pt-0">

      <div className="grid  w-full h-max lg:grid-cols-[1fr,max-content,1fr] grid-cols-1 items-start overflow-hidden heroDiv">
        <div className="relative hidden h-60 aspect-square lg:block ">
          <Illustration1 className=' -translate-y-[20%] -translate-x-[140px] xl:-translate-x-12  lg:scale-[0.35] scale-[0.25]' />
        </div>
        <section className="flex flex-col h-full w-max max-w-full mx-auto justify-center  gap-1">
          <h1 className="text-4xl md:text-6xl font-bold text-center">The Hottest</h1>
          <h1 className="text-4xl md:text-6xl font-bold text-center"> <span className="text-red-500">Polling</span> Platform</h1>
          <section className=" shadow-red-500 shadow-md text-sm rounded-md bg-popover/80 w-fit px-2 py-1 self-center my-2 "> <p className="opacity-80">Create, Share, and Discover Engaging Polls!</p></section>
          <ol className="olTest  gap-1 flex flex-col mt-2 md:pl-0 pl-6">
            <li ><p className="inline" ><span className="font-semibold">Create your own polls </span> <span className="opacity-70">and share it with others.</span> </p></li>
            <li ><p className="inline"><span className="font-semibold">Different Polls styles </span> <span className="opacity-70">Tournament mode / order by most favorite.</span></p></li>
            <li ><p className="inline"> <span className="font-semibold">Poll stats </span>  <span className="opacity-70">so you can compare your results with others.</span> </p></li>
          </ol>
          <div className="flex items-center gap-4 w-full justify-center my-6">


            <Link className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 rounded-md p-2" href={'/create'}>
              <p>Create a poll</p>
              <IoCreateOutline />
            </Link>
          </div>

        </section>
        <div className="relative hidden h-60 aspect-square lg:block">
          <Illustration2 className=' lg:-translate-x-1/3 xl:-translate-x-[20%] scale-[0.4] xl:scale-[0.5]' />
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