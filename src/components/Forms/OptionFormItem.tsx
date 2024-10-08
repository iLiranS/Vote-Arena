import { createOptionFormModel } from '@/lib/models'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FiTrash } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import OptionForm from './OptionForm';
import { MdDragIndicator } from "react-icons/md";
import { Reorder, useDragControls } from 'framer-motion'
import { extractYouTubeId } from '@/lib/utils';



const OptionFormItem: React.FC<{ option: createOptionFormModel, onRemove: (index: number) => void, index: number, onUpdate: (index: number, option: createOptionFormModel) => boolean, order: boolean, is_group_a: boolean, hueShift: number, isFirstInGroup: boolean }> = ({ option, onRemove, index, onUpdate, order, is_group_a, hueShift, isFirstInGroup }) => {
    const [editMode, setEditMode] = useState(false);
    const controls = useDragControls()
    const isFirstGroupA = is_group_a && isFirstInGroup && order;
    const isFirstGroupB = !is_group_a && isFirstInGroup && order;

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
    }

    // returns true if success
    const finishEditHandler = (values: createOptionFormModel): boolean => {

        const doesExist = onUpdate(index, values);

        if (doesExist) return false; // not valid
        setEditMode(false);
        return true; // useless because edit mode off.
    }
    const bg_color = `hsl(${hueShift}, 100%, 50%)`;

    return (
        <Reorder.Item animate={false} dragListener={false} dragControls={controls} className={`${order ? 'listOrderItem even:mb-4' : ''} animate-none select-none ${isFirstGroupB && 'first_b_item'} ${isFirstGroupA && 'first_a_item'} relative`} value={option} key={option.title}>


            <div style={{ '--bg_color': bg_color } as React.CSSProperties} className={`grid grid-cols-[1fr,max-content] items-center justify-between gap-2 listOrderContent relative  rounded-md overflow-hidden  px-2 py-1 h-max ${order && is_group_a ? 'bg-violet-400/50' : 'bg-amber-400/50'}`}>
                <section className='grid small:grid-cols-[1fr,max-content] items-center gap-2 relative h-full grid-flow-row small:grid-flow-col'>
                    <div className=' gap-2 items-center min-w-20 max-w-full hidden sm:flex'>
                        {/* <p className='opacity-50'>{index + 1}.</p> */}
                        <p className='w-max truncate'> {option.title}</p>
                    </div>
                    <div className='relative h-max max-h-full w-max border-2 border-black '>
                        {option.source === 'image' ? <img draggable={false} className=' md:h-20 w-auto h-6 xs:h-8 select-none' src={option.src} alt={option.title} />
                            :
                            <iframe src={`https://www.youtube.com/embed/${extractYouTubeId(option.src)}`} frameBorder="0" allowFullScreen className='w-40 max-w-full aspect-video w'></iframe>
                        }
                    </div>
                </section>
                <section className='flex items-center gap-2'>
                    {!editMode && <Button size='icon' variant={'outline'} onClick={toggleEditMode}><TbEdit /></Button>}
                    <Button size='icon' variant={'outline'} onClick={() => { onRemove(index) }}><FiTrash /></Button>
                    <Button style={{ touchAction: 'none' }} size='icon' variant='ghost' className='bg-inherit hover:bg-inherit  text-lg' onPointerDown={(e) => controls.start(e)}><MdDragIndicator /></Button>
                </section>
            </div>
            {editMode &&
                <div className='p-1'>
                    <OptionForm cancelHandler={() => { setEditMode(false) }} editMode type={option.source} initialValues={option} onAdd={finishEditHandler} />
                </div>
            }
        </Reorder.Item>
    )
}

export default OptionFormItem