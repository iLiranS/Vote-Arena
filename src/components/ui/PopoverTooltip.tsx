import React from 'react'
import { FaInfo } from "react-icons/fa6";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const PopoverTooltip: React.FC<{ message: string | React.ReactNode, className?: string }> = ({ message, className }) => {
    return (
        <Popover>
            <PopoverTrigger className={`bg-popover opacity-60 p-1 rounded-full ${className}`}> <FaInfo /></PopoverTrigger>
            <PopoverContent>{message}</PopoverContent>
        </Popover>
    )
}

export default PopoverTooltip