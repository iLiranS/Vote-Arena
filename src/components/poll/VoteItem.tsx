import { optionPollForm } from '@/lib/models'
import { extractYouTubeId } from '@/lib/utils'
import { Reorder, useDragControls } from 'framer-motion'
import React from 'react'
import { CiMedal } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";
import { Button } from '../ui/button';


const VoteItem: React.FC<{ option: optionPollForm, top: number, topAmount: number }> = ({ option, top, topAmount }) => {
    const controls = useDragControls()

    return (
        <Reorder.Item dragControls={controls} dragListener={false} value={option} className='grid grid-cols-[25px,1fr,max-content] items-center reorderItem'>
            <section className='items-center flex '>
                {top <= topAmount && top <= 3 && <CiMedal className={`text-lg ${top == 1 && 'text-yellow-500 dark:text-yellow-400'} ${top == 2 && 'text-slate-500 dark:text-slate-300'} ${top == 3 && 'text-amber-700'}`} />}
                {top <= topAmount && top >= 4 && <section className='p-1 aspect-square grid place-items-center'><p className='opacity-60'>{top}</p></section>}
            </section>
            <div className='flex justify-between bg-card aspect-[4/1] h-full p-2 rounded-md relative'>
                <h6 className='xs:text-lg xxs:text-sm w-full break-words max-w-[70%] tru'>{option.title}</h6>
                {option.source === 'image' ? <img className='h-full w-auto rounded-md border-2 border-foreground/10' src={option.src} alt={option.title + ' image alt'} />
                    :
                    <iframe src={`https://www.youtube.com/embed/${extractYouTubeId(option.src)}`} frameBorder="0" allowFullScreen className='h-full aspect-video  rounded-md border-2 border-foreground/10'></iframe>

                }
            </div>
            <Button onClick={(e) => { e.preventDefault() }} style={{ touchAction: 'none' }} size='icon' variant='ghost' className='bg-inherit hover:bg-inherit opacity-80 text-lg' onPointerDown={(e) => controls.start(e)}><MdDragIndicator /></Button>
        </Reorder.Item>
    )
}

export default VoteItem