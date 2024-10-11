import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { createOptionFormModel } from '@/lib/models'
import { Reorder } from 'framer-motion'
import { CiBoxList } from "react-icons/ci";
import OptionFormItem from './OptionFormItem';
import OptionForm from './OptionForm';
import PopoverTooltip from '../ui/PopoverTooltip';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { PollType } from '@prisma/client';

const CreateOptions: React.FC<{ onBack: (options: createOptionFormModel[]) => void, onCreate: (options: createOptionFormModel[], token: string) => void, initialOptions: createOptionFormModel[], formStyle: PollType, type: 'video' | 'image', showOrder: boolean, pending: boolean, top: number }> = ({ onBack, onCreate, initialOptions, formStyle, type, showOrder, pending, top }) => {
    const [options, setOptions] = useState(initialOptions);
    const [warning, setWarning] = useState<string | null>(null);
    const theme = useTheme();
    const optionsListRef = useRef<HTMLUListElement | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '';


    const isFormValid = (): boolean => {
        if (options.length < 2) {
            setWarning('Must have at least 2 options !')
            return false;
        }
        // if not even in tourny set warning.
        if (formStyle === 'TOURNY' && (options.length & (options.length - 1)) != 0) {
            // if power of 2, binary format : 10000... , susbtract 1 and we get 0111111 and if the binary difference not 0, then not power of 2.
            setWarning('In tournamnet mode, must have power of 2 elements! {2,4,8,...,64}')
            return false;
        }
        if (!captchaToken) {
            setWarning("please verify captcha challenge");
            return false;
        }
        if (formStyle === 'VOTE' && options.length < top) {
            setWarning("Must have at least " + top + " options to match your poll structure.");
            return false;
        }
        return true;
    }

    const onBackHandler = () => onBack(options);
    const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFormValid() && captchaToken) {
            onCreate(options, captchaToken);
        }
    }



    const addOptionHandler = (option: createOptionFormModel): boolean => {
        if (doesTitleExist(option.title)) return false;
        setOptions(prev => [...prev, option]);

        return true;

    }

    const removeQuestionHandler = (index: number) => {
        setOptions(prev => {
            const updated = prev.filter((_, i) => i !== index);
            return updated;
        })
    }
    const updateOptionHandler = (index: number, option: createOptionFormModel): boolean => {
        if (doesTitleExist(option.title, index)) return true;
        setOptions(prev => {
            const updated = [...prev];
            updated[index] = option;
            return updated;
        })
        return false;
    }
    // returns true if exists and not himself.
    const doesTitleExist = (title: string, index = -2) => {
        const indexInArray = options.map(option => option.title).indexOf(title);
        return indexInArray > -1 && indexInArray != index;
    }

    useEffect(() => {
        let updatedWarning: string | null = null;
        if (options.length >= 64) updatedWarning = 'Max options cap (64)';
        setWarning(updatedWarning);
        // const optionsList = optionsListRef.current;
        // if (optionsList) {
        //     optionsList.scrollTo({
        //         top: optionsList.scrollHeight,
        //         behavior: 'smooth'
        //     })
        // }
    }, [options])

    const captchaVerifyHandler = (token: string) => {
        setCaptchaToken(token);
    }



    // https://en.wikipedia.org/wiki/Single-elimination_tournament

    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Add Option</h2>
            {options.length < 64 && <OptionForm cancelHandler={() => { }} type={type} onAdd={addOptionHandler} />}
            {showOrder &&
                <div className='flex items-center gap-2 justify-center'>
                    <p>Tourny Order</p>
                    <PopoverTooltip message={
                        <div className='text-center'>
                            <p>Single-elimination tournament</p>
                            <Link className='text-violet-400' href={'https://en.wikipedia.org/wiki/Single-elimination_tournament'} target='_blank'>(read more)</Link>
                            <p>Group A 🟪</p>
                            <p>Group B 🟨</p>
                        </div>} />
                </div>}
            <section className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <p className='opacity-50'>Draggable List</p>
                    <CiBoxList />
                </div>

                <p className='self-end'>Total : {options.length}</p>
            </section>
            <Reorder.Group as='ol' axis='y' values={options} onReorder={setOptions} ref={optionsListRef} className={`border-t-2 transition-all border-b-2 py-2 border-popover  ${showOrder ? 'gap-1' : 'gap-4'} overflow-y-auto flex flex-col`}>
                {options.length > 0 ? options.map((option, index) =>
                    <OptionFormItem isFirstInGroup={index == 0 || index == Math.ceil(options.length / 2)} key={JSON.stringify(option)} hueShift={Math.floor(index / 2) * 50} order={showOrder} is_group_a={index < options.length / 2} onUpdate={updateOptionHandler} index={index} onRemove={removeQuestionHandler} option={option} />
                )
                    :
                    <p className='self-center opacity-50'>Add options to show them here...</p>
                }
            </Reorder.Group>
            {warning && <p className='text-yellow-500'>{warning}</p>}

            <form className='flex flex-col gap-2 items-center'>
                <HCaptcha onExpire={() => { setCaptchaToken(null) }} theme={theme.theme} sitekey={siteKey} onVerify={captchaVerifyHandler} />
                <div className='w-full flex justify-between mt-6'>
                    <Button variant='outline' onClick={onBackHandler}>Go Back</Button>
                    <Button disabled={pending} onClick={onSubmitHandler} type='submit' >{pending ? 'Submiting...' : 'Create Poll'}</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateOptions