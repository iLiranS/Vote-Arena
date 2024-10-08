import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import React from "react"

const ButtonLoading: React.FC<{ placeholder: string, className?: string }> = ({ placeholder, className }) => {
    return (
        <Button className={className ?? ''} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {placeholder}
        </Button>
    )
}
export default ButtonLoading
