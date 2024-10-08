import React from 'react'
import { CiCircleQuestion } from "react-icons/ci";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const TooltipInfo: React.FC<{ message: string }> = ({ message }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger onClick={(e) => { e.preventDefault(); }}><CiCircleQuestion className='text-lg' /></TooltipTrigger>
                <TooltipContent>
                    <p>{message}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default TooltipInfo