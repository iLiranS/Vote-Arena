import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { IoMailOutline } from "react-icons/io5";
const Footer = () => {
    return (


        <footer className="bg-card rounded-lg shadow m-4">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <div className="text-sm text-center ">© 2024 <a href="https://github.com/iLiranS/Vote-Arena" className='text-red-500 mr-1'>Vote Arena</a> Made with ♥️ by <a className='text-red-500' href='https://github.com/iLiranS'>iLiranS</a>
                </div>
                <ul className="flex flex-wrap gap-2 justify-center items-center mt-3 text-sm font-medium  sm:mt-0 opacity-80">
                    <li>
                        <Button variant='ghost' asChild={true}><Link href={'/about'}>About</Link></Button>
                    </li>
                    <li>
                        <Button variant='ghost' asChild={true}><Link href={'/privacy'}>Privacy & TOS</Link></Button>
                    </li>

                    <li>
                        <Button className='border-2 border-popover' variant='outline' size='icon' asChild={true}><Link className='text-xl grid place-items-center' target='_blank' href={'mailto:liransdev@gmail.com'}><IoMailOutline /></Link></Button>
                    </li>
                    <li>
                        <Button className='border-2 border-popover' variant='outline' size='icon' asChild={true}><Link className='text-xl grid place-items-center' target='_blank' href={'https://github.com/iLiranS/Vote-Arena'}><FaGithub /></Link></Button>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer