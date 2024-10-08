'use client'
import { switcherElementProps } from '@/lib/models';
import SwitcherElement from './SwitcherElement';
import { useEffect, useRef, useState } from 'react';



const Switcher: React.FC<{ activeIndex: number, selecterFunction: (val: number) => void, elements: switcherElementProps[], scaleDown?: boolean }> = ({ activeIndex, selecterFunction, elements, scaleDown }) => {
    const switcherRef = useRef<HTMLDivElement | null>(null);
    const [translates, setTranslates] = useState<number[]>([]);
    let translateValue = 0;
    for (let i = 0; i < activeIndex; i++) {
        translateValue += translates[i];
    }

    useEffect(() => {
        if (!switcherRef.current) return;
        const buttons = switcherRef.current.querySelectorAll('button');
        const widths = Array.from(buttons).map(button => button.offsetWidth);
        setTranslates(widths);


    }, [switcherRef, setTranslates])



    const switchHandler = (val: number) => {
        selecterFunction(val);
    }

    return (
        <div ref={switcherRef} className={`w-max min-w-max h-full  overflow-hidden rounded-lg bg-card border-popover border-2 flex relative`}>
            {elements.map((el, index) => <SwitcherElement key={el.title + index} scaleDown={scaleDown} element={el} activeIndex={activeIndex} updateFunction={switchHandler} index={index} />)}

            {activeIndex > -1 && <div style={{ width: translates[activeIndex] + 'px', translate: translateValue + 'px', transition: '500ms', animationTimingFunction: 'ease-in-out' }} className={`absolute  h-full blur-md ${elements[activeIndex].bg_color} left-0  transition-transform ease-in-out duration-300 z-0`}></div>}
        </div>
    )
}

export default Switcher