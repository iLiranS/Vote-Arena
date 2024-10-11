import { switcherElementProps } from '@/lib/models'
import React from 'react'

const SwitcherElement: React.FC<{ element: switcherElementProps, index: number, updateFunction: (index: number) => void, activeIndex: number, scaleDown?: boolean }> = ({ element, index, updateFunction, activeIndex, scaleDown }) => {
    return (
        <button disabled={element.disabled} onClick={(e) => { e.preventDefault(); updateFunction(index) }} className={`flex px-2  border-l-2 first:border-l-0  border-popover   w-max py-1 justify-evenly items-center  ${element.disabled ? 'opacity-20 cursor-not-allowed bg-gray-500/20' : 'cursor-pointer'} transition-all  duration-300 ease-out ${activeIndex == index ? element.color : 'text-foreground'} ${activeIndex == index ? 'opacity-100 bg-transparent' : 'opacity-50 text-foreground bg-background '} z-10
        ${scaleDown ? 'text-xs gap-1  xs:text-base small:gap-2  ' : 'gap-2'}`}>
            <p>{element.title}</p>
            <section className={`items-center flex`}>
                {element.icon}
            </section>
        </button>
    )
}

export default SwitcherElement