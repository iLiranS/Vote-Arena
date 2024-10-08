import { PollResultOption } from '@/lib/models'
import { extractYouTubeId, getHotLevelColor } from '@/lib/utils'
import React from 'react'
import PopoverTooltip from '../ui/PopoverTooltip';
import { CiMedal } from 'react-icons/ci';
const PollResultItem: React.FC<{ resultOption: PollResultOption, submissions: number, index: number, tourny?: boolean }> = ({ resultOption, submissions, index, tourny }) => {
    const winPercentage = resultOption.winCount / submissions * 100;
    // ${index == 0 && 'text-yellow-500 dark:text-yellow-400'} ${index == 1 && 'text-slate-500 dark:text-slate-300'} ${index == 2 && 'text-amber-700'}`}
    // { '--bg_color': bg_color } as React.CSSProperties
    const top = index + 1;
    return (
        <li className={` flex gap-1`}>
            <section className='items-center flex '>
                {top && top <= 3 && <CiMedal className={`text-lg ${top == 1 && 'text-yellow-500 dark:text-yellow-400'} ${top == 2 && 'text-slate-500 dark:text-slate-300'} ${top == 3 && 'text-amber-700'}`} />}
                {top && top >= 4 && <section className='p-1 aspect-square grid place-items-center'><p className='opacity-60'>{top}</p></section>}
            </section>
            <div className='relative w-full h-full border-2 rounded-md p-2  border-opacity-30 dark:border-opacity-30'>


                <h3 className='text-lg'>{resultOption.title}</h3>
                <div className='flex justify-between'>
                    <section className='h-20'>
                        {resultOption.source === 'image' ? <img loading='lazy' className='h-full w-auto rounded-md border-2 border-foreground/10' src={resultOption.src} alt={resultOption.title + ' image alt'} />
                            : <iframe src={`https://www.youtube.com/embed/${extractYouTubeId(resultOption.src)}`} frameBorder="0" allowFullScreen className='h-full aspect-video  rounded-md border-2 border-foreground/10'></iframe>
                        }
                    </section>

                    <section className='flex flex-col justify-center gap-2'>
                        <div className='flex gap-1 items-center'>
                            <div className='flex items-center gap-2 xs:w-[150px] w-[100px] bg-popover h-[30px] relative rounded-sm px-1 overflow-hidden'>
                                <section className='flex items-center  justify-between gap-1 w-full z-10'>
                                    <p>🎯</p>
                                    <p>{resultOption.percent}%</p>
                                </section>
                                <div style={{ backgroundColor: getHotLevelColor(resultOption.percent), '--width_target': resultOption.percent + "%" } as React.CSSProperties} className={`absolute transition-all  left-0 top-0 h-full rounded-l-sm resultProgress`}></div>
                            </div>
                            <PopoverTooltip className='text-xs' message={tourny ? 'duels win rate' : 'points / total points'} />
                        </div>

                        <div className='flex gap-1 items-center'>

                            <div className='flex items-center justify-end gap-2 xs:w-[150px] w-[100px] bg-popover h-[30px] relative rounded-sm px-1 overflow-hidden'>
                                <section className='flex items-center justify-between w-full gap-1  z-10    rounded-md 0'>
                                    <p >🏆</p>
                                    <p> {resultOption.winCount}</p>
                                </section>
                                <div style={{ '--width_target': winPercentage + "%", backgroundColor: getHotLevelColor(winPercentage) } as React.CSSProperties} className={`absolute left-0 top-0 h-full rounded-l-sm resultProgress`}></div>
                            </div>
                            <PopoverTooltip className='text-xs' message='wins / total submissions' />
                        </div>




                    </section>
                </div>
            </div>
        </li>
    )
}

export default PollResultItem