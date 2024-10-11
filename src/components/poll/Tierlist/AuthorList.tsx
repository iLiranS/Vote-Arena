import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { optionPollForm } from "@/lib/models";
import { extractYouTubeId } from "@/lib/utils";

interface Props {
    options: optionPollForm[];
    listId: string;
    listType?: string;
    internalScroll?: boolean;
    isCombineEnabled?: boolean;
}

export const AuthorList: React.FC<Props> = ({ listId, listType, options }) => {
    let backgroundColor;
    switch (listId) {
        case 'S':
            backgroundColor = '#f87171'
            break;
        case 'A':
            backgroundColor = '#fb923c'
            break;
        case 'B':
            backgroundColor = '#facc15'
            break;
        case 'C':
            backgroundColor = '#bef264'
            break;
        case 'D':
            backgroundColor = '#22d3ee';
            break;
        default:
            backgroundColor = 'undefiend'

    }
    return (
        <div className={`grid  items-center  ${listId === 'items' ? 'grid-rows-[max-content,1fr]' : 'grid-cols-[max-content,1fr] '} bg-popover dark:bg-card  rounded-md`}>
            <div style={{ backgroundColor }} className={` h-full  grid   ${listId === 'items' ? 'opacity-50 text-sm pl-2' : 'text-lg font-semibold place-items-center w-20'} rounded-l-md`}>
                <h3 className="drop-shadow-md">{listId === 'items' ? 'items - (on mobile, long press, then drag).' : listId}</h3>
            </div>
            <Droppable
                droppableId={listId}
                type={listType}
                direction='horizontal'
                isCombineEnabled={false}
            >
                {dropProvided => (
                    <div className="w-full" {...dropProvided.droppableProps}>
                        <div>

                            <div className={`flex gap-2 h-max p-2 min-h-[100px]`}>

                                <div className={`grid ${options.length > 0 && options[0].source === 'video' ? 'grid-cols-[repeat(auto-fit,128px)]' : 'grid-cols-[repeat(auto-fit,80px)]'} grid-flow-row-dense gap-2 w-full`} ref={dropProvided.innerRef}>
                                    {options.map((option, index) => (
                                        <Draggable key={option.title} draggableId={option.title} index={index}>
                                            {dragProvided => (
                                                <div style={{ touchAction: 'none' }}
                                                    {...dragProvided.dragHandleProps}
                                                    {...dragProvided.draggableProps}
                                                    ref={dragProvided.innerRef}
                                                >
                                                    <div className={`relative w-full overflow-hidden  grid place-items-center ${options.length > 0 && options[0].source === 'image' ? 'aspect-square' : 'aspect-video'}`}>
                                                        {option.source === 'image' ? <img draggable={false} className=' w-full h-full select-none' src={option.src} alt={option.title} />
                                                            :
                                                            <iframe src={`https://www.youtube.com/embed/${extractYouTubeId(option.src)}`} frameBorder="0" allowFullScreen className='w-full h-full'></iframe>
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {dropProvided.placeholder}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
        </div>
    );
};