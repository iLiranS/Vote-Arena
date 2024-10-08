import React from 'react'
import SideBarItem from './SideBarItem'
import { TbHome } from "react-icons/tb";
import { MdOutlineExplore, MdNotifications } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosBookmark } from 'react-icons/io'

const Sidebar = () => {
    return (
        <aside className='w-12 min-w-12 max-w- md:w-16 md:min-w-16 md:max-w-16  h-full max-h-full py-soft relative overflow-x-visible z-20'>
            <div className='h-full w-full relative'>
                <div className='h-full w-full px-1 py-4 border-r-2 border-popover/50 rounded-2xl flex flex-col justify-between hover:w-44  duration-200 group ease-in-out bg-card absolute'>
                    <div className='flex flex-col gap-4'>
                        <SideBarItem icon={<TbHome />} name='Home' unrotateable textColorClass='text-blue-400' active />
                        <SideBarItem icon={<MdOutlineExplore />} textColorClass='text-yellow-500' name='Explore' />
                        <SideBarItem icon={<IoIosBookmark />} textColorClass='text-red-400' name='Saved' />
                    </div>
                    <div className='flex gap-4 flex-col'>
                        <SideBarItem icon={<MdNotifications />} textColorClass='text-yellow-500' notification notificationAmount={12} name='Notifications' />
                        <SideBarItem icon={<FaUser />} unrotateable name='Login' />
                    </div>

                </div>
            </div>
        </aside>
    )
}

export default Sidebar