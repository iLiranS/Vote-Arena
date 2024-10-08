"use client"
import React, { useEffect, useState } from 'react'
import { ModeToggle } from '../theme/ModeToggle'
import { switcherElementProps } from '@/lib/models'
import { FaRegNewspaper } from "react-icons/fa6";
import { IoCreateOutline } from "react-icons/io5";
import Switcher from '../ui/Switcher'
import { useRouter, usePathname } from 'next/navigation'
// import { MdOutlineExplore } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import Search from './Search';
import { Button } from '../ui/button';
import Link from 'next/link';

let lastScrollPos = 0;
let lastVisiblePos = 0;
let isVisible = true;

const feed: switcherElementProps = {
    title: 'Feed',
    icon: <FaRegNewspaper />,
    color: 'text-red-500',
    bg_color: 'bg-red-500/20'
}
const create: switcherElementProps = {
    title: 'Create',
    icon: <IoCreateOutline />,
    color: 'text-blue-400',
    bg_color: 'bg-blue-500/20'
}
// const explore: switcherElementProps = {
//     title: 'Explore',
//     icon: <MdOutlineExplore />,
//     color: 'text-yellow-600 dark:text-yellow-400',
//     bg_color: 'bg-yellow-600/20 dark:bg-yellow-400/20'
// }
// const profile: switcherElementProps = {
//     title: 'Profile',
//     icon: <CgProfile />,
//     color: 'text-teal-500',
//     bg_color: 'bg-teal-500/20'
// }
const switcherElements = [feed, create];

const Header = () => {
    const [initialIndexUpdate, setInitialIndexUpdate] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1); // 0 is feed, 1 is create
    const [visible, setVisisble] = useState(true);
    const router = useRouter();
    const pathname = usePathname()



    useEffect(() => {
        if (initialIndexUpdate || !pathname) return;
        if (pathname == '/create') setActiveIndex(1);
        setInitialIndexUpdate(true);
    }, [pathname, initialIndexUpdate])


    useEffect(() => {
        const scrollHandler = () => {

            const currentYOffset = window.scrollY;
            if (currentYOffset < lastScrollPos) {
                // scrolled up
                setVisisble(true);
                lastScrollPos = currentYOffset;
                if (!isVisible) {
                    lastVisiblePos = lastScrollPos
                }
            }
            else {
                // check if made some progress, then hide (50 margin test)
                if (currentYOffset > lastVisiblePos + 50) {
                    setVisisble(false);
                    lastScrollPos = currentYOffset;
                    isVisible = false;
                }
            }
        }

        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [])



    const updateActiveIndex = (val: number) => {
        setActiveIndex(val);
        switch (val) {
            case 0:
                router.push('/');
                break;
            // case 1:
            //     router.push('/explore');
            //     break;
            default:
                router.push('/create');
        }
    }

    useEffect(() => {
        if (pathname === '/create') setActiveIndex(1);
        else if (pathname === '/') setActiveIndex(0);
        else setActiveIndex(-1)

    }, [pathname])



    return (
        <header className={`w-full h-12   fixed z-50 top-0  flex gap-0 small:gap-2  p-2 justify-between transition-transform duration-500 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}>

            <Switcher scaleDown elements={switcherElements} selecterFunction={updateActiveIndex} activeIndex={activeIndex} />
            <div className='flex h-full  relative items-center gap-1 md:gap-2 md:w-full justify-end'>
                <Search />
                <Button className='border-2 border-popover' variant='outline' size='icon' asChild={true}><Link className='text-xl grid place-items-cente' target='_blank' href={'https://github.com/iLiranS/Vote-Arena'}><FaGithub /></Link></Button>
                <ModeToggle />
            </div>

        </header>
    )
}

export default Header