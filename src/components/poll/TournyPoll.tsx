import { optionPollForm } from '@/lib/models';
import { Poll } from '@prisma/client'
import React, { useEffect, useMemo, useState } from 'react'
import TournyPollItem from './TournyPollItem';
import { extractYouTubeId, getEmptyStageData, getStageMatches, getStageNameByOptionsAmount, getTournyResults } from '@/lib/utils';
import { Button } from '../ui/button';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { bracketMatch } from './Bracket/BracketModels';
import Bracket from './Bracket/Bracket';





const shuffleArray = (array: optionPollForm[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

const TournyPoll: React.FC<{ poll: Poll, onSubmit: (values: number[], token: string, winnerIndex: number, updatedDuels?: number[]) => Promise<boolean> }> = ({ poll, onSubmit }) => {

    const initialOptions = useMemo(() => {
        const options = typeof poll.options === 'string' ? poll.options : '[]';
        const parsedOptions = JSON.parse(options) as optionPollForm[];
        return parsedOptions;
    }, [poll.options])

    const initialArr = useMemo(() => {
        let options = [...initialOptions];
        if (poll.additionalField === 'random') {
            options = shuffleArray(options); // Shuffle if the field is 'random'
        }
        return options;
    }, [poll.additionalField, initialOptions]);


    const totalStages = useMemo(() => Math.log2(initialArr.length), [initialArr])
    const [stages, setStages] = useState<bracketMatch[][]>(Array.from({ length: totalStages }).map((el, index) => index === 0 ? getEmptyStageData(initialArr, 0, initialArr.length) : getEmptyStageData([], 0, getStageMatches(index, initialArr.length) * 2)));
    const [stage, setStage] = useState(0);
    const StageRounds = stages[stage].length;
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [round, setRound] = useState(0);
    const theme = useTheme();
    const [didSubmit, setDidSubmit] = useState(false);
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '';
    const [isVisible, setIsVisible] = useState(true);
    const [winner, setWinner] = useState<optionPollForm | undefined>(undefined)
    const stageString = useMemo(() => winner ? 'Winner' : getStageNameByOptionsAmount(initialArr.length, stage), [initialArr, stage, , winner])
    const [showBracket, setShowBracket] = useState(true);



    const onChooseHandler = (index: 0 | 1) => {
        setIsVisible(false);

        const roundWinner = index === 0 ? stages[stage][round].first : stages[stage][round].second;
        setStages(prev => {
            const updatedStages = [...prev];

            // Update the current match with the winner
            updatedStages[stage][round].winnerTitle = roundWinner.title;

            // Check if there is a next stage
            if (stage < totalStages - 1) {
                const nextMatchIndex = Math.floor(round / 2); // Each next-stage match comes from two current matches

                // Determine if the winner should go to 'first' or 'second'
                if (round % 2 === 0) {
                    // If current round is even, winner goes to 'first' of the next match
                    updatedStages[stage + 1][nextMatchIndex].first = roundWinner;
                } else {
                    // If current round is odd, winner goes to 'second' of the next match
                    updatedStages[stage + 1][nextMatchIndex].second = roundWinner;
                }
            }

            return updatedStages;
        });

        if (stage < totalStages - 1) {
            setRound(prev => {
                if (round === StageRounds - 1) return 0;
                return prev + 1;
            });

            if (round === (stages[stage].length - 1)) {
                setStage(prev => prev + 1)
            }

        }
        else {
            if (round === StageRounds - 1) {
                // winner
                setWinner(roundWinner);
            }
        }

    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);
        return () => { clearTimeout(timer); }
    }, [isVisible])


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!winner) return;
        const tournyResults = getTournyResults(stages, initialOptions);
        const winnerIndex = initialOptions.map(option => option.title).indexOf(winner.title);

        if (!captchaToken || didSubmit) return;
        setDidSubmit(true);

        const isSuccess = await onSubmit(tournyResults.winsCount, captchaToken, winnerIndex, tournyResults.duelCount);
        if (!isSuccess) setDidSubmit(false);
    }

    const captchaVerifyHandler = (token: string) => {
        setCaptchaToken(token);
    }


    return (
        <div className='flex flex-col w-full overflow-hidden'>
            <div className='flex items-center md:flex-col justify-center gap-2 md:gap-0'>

                <h3 key={stage} className='small:text-xl bg-popover w-max px-2 self-center rounded-md animate-scaleIn'>{stageString}</h3>
                {!winner &&
                    <div className='text-center opacity-70 animate-scaleIn flex items-center gap-1 justify-center relative overflow-hidden text-sm'>
                        <p>Round</p>
                        <p className='animate-translateUp translate-y-full' key={round}>{round + 1}</p>
                        <p> / {StageRounds}</p>
                    </div>
                }
            </div>
            {!winner ?
                <div className='grid grid-rows-[1fr,max-content,1fr] lg:grid-rows-1 lg:grid-cols-[1fr,max-content,1fr]  small:gap-4 w-full p-2 overflow-hidden'>
                    <TournyPollItem isFirst={true} isVisible={isVisible} option={stages[stage][round].first} onChoose={onChooseHandler} />

                    <div className='grid place-items-center h-max lg:h-full relative 0'>
                        <div className='lg:h-full lg:w-[2px] w-full h-[2px] absolute lg:left-1/2 lg:-translate-x-1/2 top-1/2 -translate-y-1/2 lg:top-0 lg:translate-y-0 bg-foreground/20'></div>
                        <div className='grid place-items-center h-max w-max p-1 bg-background z-10'>
                            <p className={` vsText font-bold text-xl lg:text-3xl self-center`}>VS</p>
                        </div>
                    </div>


                    <TournyPollItem isFirst={false} isVisible={isVisible} option={stages[stage][round].second} onChoose={onChooseHandler} />
                </div>

                :
                <form onSubmit={submitHandler} className='flex flex-col gap-2 mt-2'>
                    <h3 className='small:text-xl bg-popover w-max px-2 self-center rounded-md animate-scaleIn'>{winner.title}</h3>
                    <section className='relative w-full rounded-md overflow-hidden max-w-[800px] mx-auto'>
                        {winner.source === 'image' ? <img draggable={false} className='w-full' src={winner.src} alt={winner.title} />
                            :
                            <iframe src={`https://www.youtube.com/embed/${extractYouTubeId(winner.src)}`} frameBorder="0" allowFullScreen className='w-full aspect-video'></iframe>
                        }
                    </section>
                    <div className='justify-center flex'>
                        <HCaptcha onExpire={() => { setCaptchaToken(null) }} theme={theme.theme} sitekey={siteKey} onVerify={captchaVerifyHandler} />
                    </div>
                    <div className='flex  gap-4 justify-center'>

                        <Button disabled={!captchaToken || didSubmit} type='submit'>Submit results</Button>

                        <Link className='w-fit' href={`${process.env.NEXT_PUBLIC_BASE_URL}/${poll.id}/results`}>
                            <Button variant='outline' type='button'>Skip to results 🥹</Button>
                        </Link>


                    </div>
                </form>
            }
            <Button className='w-fit self-center my-2' variant='secondary' onClick={() => { setShowBracket(prev => !prev) }}>{showBracket ? 'Hide bracket' : 'Show bracket'}</Button>
            {showBracket &&
                <div className='w-full max-w-full h-full max-h-full overflow-auto'>
                    <Bracket stages={stages} totalOptions={initialArr.length} />
                </div>
            }
        </div>
    )
}

export default TournyPoll