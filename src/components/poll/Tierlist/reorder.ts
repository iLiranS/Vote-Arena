import { optionMap, optionPollForm } from "@/lib/models";
import { DraggableLocation } from '@hello-pangea/dnd'

// a little function to help us with reordering the result
export const reorder = (
    list: optionPollForm[],
    startIndex: number,
    endIndex: number
): optionPollForm[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderOptions = (
    options: optionMap,
    source: DraggableLocation,
    destination: DraggableLocation
) => {
    console.log("reorder called")
    const current = [...options[source.droppableId]];
    const next = [...options[destination.droppableId]];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);
        return {
            ...options,
            [source.droppableId]: reordered
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    return {
        ...options,
        [source.droppableId]: current,
        [destination.droppableId]: next
    };
};