'use client'
import { optionPollForm } from '@/lib/models'
import { Poll } from '@prisma/client'
import { Reorder } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import VoteItem from './VoteItem'
import PopoverTooltip from '../ui/PopoverTooltip'
import { Button } from '../ui/button'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useTheme } from 'next-themes';


const VotePoll: React.FC<{ poll: Poll, onSubmit: (values: number[], token: string, winnerIndex: number) => Promise<boolean> }> = ({ poll, onSubmit }) => {
    const topAmount = poll.additionalField as number;
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '';
    const theme = useTheme();
    const initialArr = useMemo(() => {
        const options = typeof poll.options === 'string' ? poll.options : '[]';
        return (JSON.parse(options) as optionPollForm[]);
    }, [poll.options])
    const extraPointInfo = topAmount > 3 ? `, 4th-${topAmount}th place: 1 point.` : ''


    const [values, setValues] = useState<optionPollForm[]>(initialArr)
    const [didSubmit, setDidSubmit] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("xd");
        e.preventDefault();
        if (!captchaToken || didSubmit) return;
        setDidSubmit(true);
        const resArr: number[] = Array.from({ length: initialArr.length });
        let winnerIndex = 0;
        const valuesTitles = values.map(value => value.title);
        const initialTitles = initialArr.map(val => val.title);
        for (let i = 0; i < topAmount; i++) {
            const indexInInitial = initialTitles.indexOf(valuesTitles[i]);
            let result = 0;
            switch (i) {
                case 0:
                    winnerIndex = indexInInitial;
                    result = 10;
                    break;
                case 1:
                    result = 5;
                    break;
                case 2:
                    result = 3;
                    break;
                default:
                    result = 1;
            }
            resArr[indexInInitial] = result;
        }
        const isSuccess = await onSubmit(resArr, captchaToken, winnerIndex);
        if (!isSuccess) {
            setDidSubmit(false);
        }



    }

    const captchaVerifyHandler = (token: string) => {
        setCaptchaToken(token);
    }





    if (values.length < 1) return <p className='text-center animate-pulse'>Loading...</p>


    return (
        <form onSubmit={submitHandler} className='h-full flex flex-col gap-2 w-full relative'>
            <div className='text-center flex gap-2 justify-center'>
                <p>Drag & Order top <span className='font-bold text-violet-500'>{topAmount}</span>  options</p>
                <PopoverTooltip
                    message={<div>
                        <p>Each option in the top <span className='text-violet-500 font-semibold'>{topAmount}</span>  will get points based on their place.</p>
                        <ul className='list-disc list-inside'>
                            <li>1st place : 10 points.</li>
                            <li>2nd place : 5 points.</li>
                            <li>3rd place : 3 points.</li>
                            {topAmount > 3 && <li>{extraPointInfo}</li>}
                        </ul>
                    </div>} />
            </div>
            <Reorder.Group className='flex flex-col gap-2 self-center w-[600px]  max-w-full px-6 sm:px-0 relative z-10' as='ol' axis='y' values={values} onReorder={setValues}>
                {values.map((option, index) => <VoteItem top={index < topAmount ? index + 1 : undefined} key={JSON.stringify(option)} option={option} />)}
            </Reorder.Group>
            <div className='justify-center flex flex-col items-center gap-1'>
                <HCaptcha onExpire={() => { setCaptchaToken(null) }} theme={theme.theme} sitekey={siteKey} onVerify={captchaVerifyHandler} />
                <Button type='submit' disabled={didSubmit || !captchaToken} className='w-max self-center'>{didSubmit ? 'Submitting...' : 'Submit'}</Button>
            </div>
        </form>
    )
}
export default VotePoll