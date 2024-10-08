import React from 'react'

const CardContainer: React.FC<{ className?: string, children?: React.ReactNode }> = ({ className = '', children }) => {
    return (
        <div className={`flex flex-col bg-card dark:bg-card/40 rounded-md pt-2 p-2 shadow-md shadow-popover dark:shadow-popover/20 ${className}`}>
            {children}
        </div>
    )
}

export default CardContainer