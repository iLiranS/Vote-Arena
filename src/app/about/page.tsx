import CardContainer from '@/components/ui/CardContainer'
import Link from 'next/link'
import React from 'react'

export function generateMetadata() {

    return {
        title: `Vote Arena - about`,
        description: `about - Vote Arena`
    }
}

const page = () => {
    return (
        <CardContainer className=' w-[600px] max-w-full  mx-auto gap-2 relative'>
            <h1 className='text-2xl md:text-4xl text-center font-bold'>About</h1>
            <div className='text-center'>Please respect the <Link className='text-violet-400 bg-violet-400/20 px-1 rounded-md' href="/privacy">TOS</Link> </div>
            <h2 className='text-xl text-red-500 font-semibold bg-red-500/20 rounded-md w-fit px-2'>The Project</h2>
            <p className='opacity-80'>The purpose of this website is to create,share and explore cool polls with others.</p>
            <div>  <span className='opacity-80'>I have some cool ideas for the </span><Link className='text-violet-400 bg-violet-400/20 px-1 rounded-md' href="#future">future</Link> <span className='opacity-80'>such as ordered timed poll.</span>  </div>
            <p className='opacity-80'>All the polls will be <span className='font-semibold text-red-500'>DELETED</span> 30 days after being created.
                This is a hobby project which uses free database and hosting platforms, and I do not plan currently to spend money on it, so it is
                necessary in order to not exceed the free plans.
            </p>

            <h2 id='polls' className='text-xl text-red-500 font-semibold bg-red-500/20 rounded-md w-fit px-2'>Polls options</h2>
            <ul className='list-disc list-inside opacity-80'>
                <li>Each poll must have a title between 2-40 letters.</li>
                <li>Each poll can be associated to 1 genre.</li>
                <li>Poll image is used for the poll previous in the home page / search for the preview, random color will be given if not provided.</li>
            </ul>
            <p className='font-semibold'>Vote poll</p>
            <div className='pl-2 relative'>
                <p className='opacity-80'>The users will order the options by dragging them.</p>
                <p className='opacity-80'>additional field of order amount : 1st place : 10 points , 2nd place : 5 points, 3rd place : 3 points and 4th and below <span className='text-sm'>(up to the given amount)</span> 1 point.</p>
                <img src="https://i.ibb.co/TTTjRR7/image.png" className='border-2  h-[250px] mx-auto' alt="" />
            </div>
            <p className='font-semibold'>Tourny poll</p>
            <div className='pl-2 relative opacity-80'>
                <p>Single-elimination tournament</p>
                <p >Random : options will be against random options <span className='text-sm'>(randomized once)</span>.</p>
                <p > Order : the creator will choose the matchups and groups.</p>
                <img src="https://i.ibb.co/s1zqC32/image.png" className='border-2  h-[250px] mx-auto' alt="" />
            </div>


            <h2 id='future' className='text-xl text-red-500 font-semibold bg-red-500/20 rounded-md w-fit px-2'>Future ideas</h2>
            <h3 className='text-lg font-semibold'>New mode : Ordered timed poll</h3>
            <p className='opacity-80'>The creator will place the initial places and set time limit for the rounds (1 Day)
                After the time limit passes the tourny will go up a stage and the option with most votes will go forward.
                In case of a tie, the system will randomly select an option.</p>
            <h3 className='text-lg font-semibold'>User System</h3>
            <p className='opacity-80'>The initial plan was to include authentication based polls, so every poll will belong to some user,
                but as the development continued, I decided to lean on the guests way, I think it will give people more freedom,
                trust and confidence to use the website. I planned to add awards system for popular polls and something like that as well.
                so I might include such a thing in the future as an optional system.
            </p>
            <h3 className='text-lg font-semibold'>Poll comments</h3>
            <p className='opacity-80'>I will add soon enough an option to add comment to polls, which can be viewed in the poll results page.</p>
            <h3 className='text-lg font-semibold'>Tier lists</h3>
            <p className='opacity-80'>A kind of a poll where you order by group ranks.</p>


        </CardContainer>
    )
}

export default page