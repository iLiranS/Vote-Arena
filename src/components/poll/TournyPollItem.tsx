import { optionPollForm } from '@/lib/models'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { extractYouTubeId } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

const TournyPollItem: React.FC<{ option: optionPollForm, onChoose: (index: 0 | 1) => void, isVisible: boolean, isFirst: boolean }> = ({ option, onChoose, isVisible, isFirst }) => {
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        // in case didn't load
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 5000);
        return () => { clearTimeout(timer); }
    }, [])



    const loaderHandler = () => {
        setLoaded(true);
    }
    const onChooseHandler = () => {
        const index = isFirst ? 0 : 1;
        onChoose(index);
    }

    return (

        <div className=' w-full aspect-[16/10] self-center  lg:aspect-[16/12]'>

            <AnimatePresence>

                {isVisible &&
                    <motion.div
                        initial={{ opacity: 0, translateX: isFirst ? '-100%' : '100%', rotate: isFirst ? -20 : 20 }}
                        animate={{ opacity: 1, translateX: 0, rotate: 0 }}
                        transition={{ duration: 0.7, ease: 'anticipate' }}
                        exit={{ opacity: 0, translateX: isFirst ? '-100%' : '100%', rotate: isFirst ? -20 : 20 }}
                        className={`    w-full h-full flex flex-col small:gap-2 justify-between gap-1 small:justify-evenly`}>
                        <h3 className='text-center md:text-2xl truncate text-sm opacity-80 mb-1 lg:mb-0'>{option.title}</h3>
                        <section className='relative w-full aspect-video rounded-md  overflow-hidden'>
                            {option.source === 'image' ? <img onLoad={loaderHandler} draggable={false} className='w-full h-full' src={option.src} alt={option.title} />
                                :
                                <iframe onLoad={loaderHandler} src={`https://www.youtube.com/embed/${extractYouTubeId(option.src)}`} frameBorder="0" allowFullScreen className='w-full h-full'></iframe>
                            }
                        </section>

                        <Button className='small:text-xl' disabled={!loaded} onClick={onChooseHandler}>Choose</Button>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default TournyPollItem