import React from 'react'

const NotificationIndicator: React.FC<{ amount: number }> = ({ amount }) => {
    return (
        <div className='absolute h-4 aspect-square top-1/4 -translate-y-1/4 right-0 rounded-full bg-red-300 dark:bg-red-400  grid place-items-center text-xs'><p>{amount}</p></div>
    )
}

export default NotificationIndicator