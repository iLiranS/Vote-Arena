import { previewPoll } from '@/lib/models';
import { getPollIconFromType, isImage } from '@/lib/utils';
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import GenreLink from './GenreLink';
import Link from 'next/link';

const PollPreview: React.FC<{ poll: previewPoll }> = ({ poll }) => {
    const { title, submissions } = poll;


    const hasSrc = isImage(poll.src)


    const pollIcon = getPollIconFromType(poll.type);


    return (

        <div style={{ backgroundColor: hasSrc ? undefined : poll.src }} className=' h-[125px] rounded-md w-full max-w-[300px]  relative  flex flex-col mx-auto justify-between  overflow-hidden'>

            {hasSrc &&
                <div className='absolute top-0 h-full w-full'>
                    <img loading='lazy' className='h-full w-full' src={poll.src} alt='' />

                </div>
            }
            <div className={` ${hasSrc ? 'bg-black/10' : 'bg-black/30'} backdrop-blur-sm h-full text-white p-2 grid grid-cols-[1fr,max-content] grid-rows-[1fr,max-content]`}>
                <h4 className=' font-semibold drop-shadow-lg offs line-clamp-2 text-lg offset h-fit w-fit'>{title}</h4>
                <div className='text-sm small:text-base flex items-center gap-1 bg-slate-900/20 backdrop-blur-md px-[6px] rounded-md h-max mt-1 w-fit'>
                    <p>{submissions}</p>
                    <FaUsers />
                </div>


                <div className='grid place-items-center z-10 w-fit' >
                    <GenreLink genre={poll.genre} className={` ${hasSrc ? 'bg-slate-900/20 backdrop-blur-md hover:bg-slate-800/70' : 'bg-slate-900 hover:bg-slate-800'}`} />
                </div>

                <div className='grid place-items-center rounded-md px-[6px] bg-slate-900/20 backdrop-blur-md'>
                    {pollIcon}
                </div>



                <div className='absolute w-full h-full grid place-items-center'>
                    <Link className='h-full w-full' href={`/${poll.id}`} />
                </div>
            </div>
        </div>
    )
}

export default PollPreview