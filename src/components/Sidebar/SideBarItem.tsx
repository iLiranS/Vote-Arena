import { sideBarItemProps } from '@/lib/models'
import Link from 'next/link'
import React from 'react'
import NotificationIndicator from './NotificationIndicator';

const SideBarItem: React.FC<sideBarItemProps> = ({ icon, name, active, textColorClass, unrotateable, notification, notificationAmount }) => {
    const textColor: string = textColorClass ?? 'text-foreground';
    return (
        <Link href={'/'} className={`flex w-full max-h-10  gap-2 hover:bg-popover rounded-lg  items-center transition-all overflow-hidden sideBarLink ${unrotateable ? 'unrotateable' : ''}`}>

            <div className='w-10 max-h-fit md:p-3 min-w-10 max-w-10 md:w-14 md:min-w-14 md:max-w-14  relative flex justify-center'>
                {notification && notificationAmount ? <NotificationIndicator amount={notificationAmount} /> : ''}
                <div className={`w-full text-xl md:text-2xl rounded-full aspect-square grid place-items-center ${textColor}  fill-red-200 ${active ? 'bg-popover' : ' '} `}>
                    {icon}
                </div>
            </div>
            <p className=' opacity-0 group-hover:opacity-100 w-full transition-opacity duration-500'>{name}</p>
        </Link >
    )
}

export default SideBarItem