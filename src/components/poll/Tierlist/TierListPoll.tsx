'use client'

import { DragDropContext } from "@hello-pangea/dnd";
import React, { useMemo, useState } from "react";
import { optionMap, optionPollForm } from "@/lib/models";
import { reorderOptions } from "./reorder";
import { AuthorList } from "./AuthorList";
import { Poll } from "@prisma/client";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const tierPoints: Record<string, number> = {
    S: 10,
    A: 5,
    B: 3,
    C: 2,
    D: 1,
};

// currently I allow to just "keep items unsorted for 0 points"
const TierlistPoll: React.FC<{ poll: Poll, onSubmit: (values: number[], token: string, winnerIndex: number[]) => Promise<boolean> }> = ({ poll, onSubmit }) => {
    const initialArr = useMemo(() => {
        const options = typeof poll.options === 'string' ? poll.options : '[]';
        return (JSON.parse(options) as optionPollForm[]);
    }, [poll.options])

    const [optionsMap, setOptions] = useState<optionMap>({
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        items: initialArr
    });

    const [didSubmit, setDidSubmit] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const theme = useTheme();
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '';

    const captchaVerifyHandler = (token: string) => {
        setCaptchaToken(token);
    }
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        // 10 pts for "S" tier , 5 pts for "A" tier , 3 pts for "B" , 2 pts for "C" tier and 1 point for "D" tier
        e.preventDefault();
        if (didSubmit || !captchaToken) return;
        setDidSubmit(true);
        const results: number[] = new Array(initialArr.length).fill(0);
        const winners: number[] = new Array(initialArr.length).fill(0);
        // Loop through each tier and add points to the respective option based on its index in initialArr
        Object.keys(tierPoints).forEach((tier) => {
            optionsMap[tier as keyof typeof optionsMap].forEach((option) => {
                const optionIndex = initialArr.findIndex((item) => item === option);
                if (optionIndex !== -1) {
                    results[optionIndex] = tierPoints[tier];
                    if (tierPoints[tier] === 10) winners[optionIndex] = 1;
                }
            });
        });

        const isSuccess = await onSubmit(results, captchaToken, winners);
        if (!isSuccess) setDidSubmit(false);
    }

    return (
        <div className=" max-w-[600px] mx-auto w-full flex flex-col gap-1">
            <p className="opacity-70 text-sm">{`inside order doesn't matter, it's also glitchy with 2+ rows of a list.`}</p>

            <DragDropContext
                onDragEnd={({ destination, source }) => {
                    // // dropped outside the list
                    if (!destination) {
                        return;
                    }

                    setOptions(reorderOptions(optionsMap, source, destination));
                }}
            >
                <div className=" w-full  flex flex-col gap-1">
                    {Object.entries(optionsMap).map(([k, v]) => (
                        <AuthorList
                            internalScroll
                            key={k}
                            listId={k}
                            listType="CARD"
                            options={v}
                        />
                    ))}
                </div>
            </DragDropContext>
            <form onSubmit={submitHandler} className='justify-center flex flex-col items-center gap-1'>
                <HCaptcha onExpire={() => { setCaptchaToken(null) }} theme={theme.theme} sitekey={siteKey} onVerify={captchaVerifyHandler} />
                <Button type='submit' disabled={!captchaToken || didSubmit} className='w-max self-center'>{didSubmit ? 'Submitting...' : 'Submit'}</Button>
            </form>
        </div>
    );
};


export default TierlistPoll