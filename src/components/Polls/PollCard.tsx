import { getPollIconFromType, getPollTitleFromType, isImage } from '@/lib/utils';
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { TbClick } from "react-icons/tb";
import GenreLink from './GenreLink';
import Link from 'next/link';
import { previewPoll } from '@/lib/models';


const PollCard: React.FC<{ poll: previewPoll }> = ({ poll }) => {

    const hasSrc = isImage(poll.src)
    const typeIcon = getPollIconFromType(poll.type);

    return (
        <li style={{ backgroundColor: hasSrc ? undefined : poll.src }} className=' h-full rounded-md  w-full list-none relative flex select-none text-white'>
            {hasSrc &&
                <section className='h-full w-full absolute -z-10'>
                    <img className='h-full w-full rounded-lg' src={poll.src ?? ''} alt={poll.title} />
                </section>
            }


            <section className='z-10 py-2 justify-between gap-1 flex flex-col w-full h-full items-center bg-black/30 backdrop-blur-sm rounded-md'>

                <h3 className='text-lg md:text-xl font-semibold text-center'>{poll.title}</h3>
                <div className='items-center flex gap-2 flex-col text-lg'>

                    <GenreLink className=' bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 backdrop-blur-md' genre={poll.genre} />

                    <section className='flex items-center gap-2'>
                        <p>{poll.submissions}</p>
                        <FaUsers className='fill-orange-400' />
                    </section>

                    <section className='flex items-center gap-2'>
                        <p>{getPollTitleFromType(poll.type)}</p>
                        {typeIcon}
                    </section>


                </div>



                <Link prefetch={false} href={`/${poll.id}`} className='group   text-base rounded-sm   flex items-center gap-1 font-medium  cursor-pointer   p-1  px-4 py-0.5  border-2 border-black   bg-white text-black transition-all  duration-200  shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),3px_3px_rgba(0,0,0),3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[1px_1px_rgba(0,0,0),1px_1px_rgba(0,0,0),1px_1px_rgba(0,0,0),0px_0px_rgba(0,0,0),0px_0px_0px_0px_rgba(0,0,0)] '>
                    Enter
                    <TbClick />
                </Link>
            </section>



        </li>
    )
}

export default PollCard