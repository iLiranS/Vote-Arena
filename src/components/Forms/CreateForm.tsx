'use client'
import React, { useEffect, useState } from 'react'
import { formSchema, genreToEmoji, getGenreBackground, getPollTypeFromTitle, getTitleFromType } from '@/lib/utils'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CiImageOn } from "react-icons/ci";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { TbTournament } from "react-icons/tb";
import { FaRandom } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
// import { IoMdTime } from "react-icons/io";
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Switcher from '../ui/Switcher'
import { createFormModel, switcherElementProps } from '@/lib/models'
import PopoverTooltip from '../ui/PopoverTooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { PiRankingDuotone } from "react-icons/pi";
import PollGenreList from '../Polls/PollGenreList'
import Link from 'next/link'



// type values (image or video poll)
const typeSwitcherOptions: switcherElementProps[] = [
    { title: 'image', icon: <CiImageOn />, color: 'text-blue-500', bg_color: 'bg-blue-500/20' },
    { title: 'video', icon: <MdOutlineOndemandVideo />, color: 'text-green-500', bg_color: 'bg-green-500/20' },
];
// style values (vote or duel poll)
const styleSwitcherOptions: switcherElementProps[] = [ // title mus match util function
    { title: 'Vote', icon: <PiRankingDuotone />, color: 'text-blue-500', bg_color: 'bg-blue-500/20' },
    { title: 'Tourny', icon: <TbTournament />, color: 'text-green-500', bg_color: 'bg-green-500/20' },
    { title: 'Tier List', icon: <CiBoxList />, color: 'text-cyan-500', bg_color: 'bg-cyan-500/20', },
    // { title: 'Timed Tourny', icon: <IoMdTime />, color: 'text-orange-500', bg_color: 'bg-orange-500/20', disabled: true },
];
// tourny values (random or order)
const tournySwitchOptions: switcherElementProps[] = [
    { title: 'Random', icon: <FaRandom />, color: 'text-blue-500', bg_color: 'bg-blue-500/20' },
    { title: 'Order', icon: <GoListOrdered />, color: 'text-green-500', bg_color: 'bg-green-500/20' },
]

const CreateForm: React.FC<{ formValue: createFormModel, submitHandler: (values: createFormModel) => void }> = ({ formValue, submitHandler }) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    // on submit handler
    function onSubmit(values: createFormModel) {
        submitHandler(values);
    }

    // creatre the from from the schema with zod resolver for validation
    const form = useForm<createFormModel>({
        resolver: zodResolver(formSchema),
        values: formValue
    })

    // keep an eye for the style to update form accordingly
    const style = form.watch('style');

    // to avoid weird behavior when changing style but additioanl field remains of old style.
    useEffect(() => {
        if (formValue.title.length > 0) return; // if already set up (went back on option page)
        if (style === 'TOURNY') form.setValue('additionalField', 'random');
        else form.setValue('additionalField', 3);
    }, [style, form, formValue])

    // get index from switcher array that matches the input value.
    const getIndexFromValue = (source: switcherElementProps[], value: string) => {
        const index = source.findIndex((option) => option.title === value);
        return (index > -1 ? index : 0);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='genre'
                    defaultValue='OTHER'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <FormControl>
                                <DropdownMenu onOpenChange={setDropDownOpen} open={dropDownOpen}>
                                    <DropdownMenuTrigger>
                                        <section style={{ color: getGenreBackground(field.value), borderColor: getGenreBackground(field.value) }} className='ml-2 flex items-center gap-2 border-2 lowercase bg-card hover:bg-popover p-1 px-2 rounded-md'>
                                            <p >{field.value}</p>
                                            {genreToEmoji(field.value)}
                                        </section>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='z-20 bg-background'>
                                        <PollGenreList selectedGenre={field.value} onClickForward={(val) => { field.onChange(val); setDropDownOpen(false) }} />
                                        <DropdownMenuRadioGroup className='grid grid-cols-3 gap-1' value={field.value} onValueChange={field.onChange}>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center gap-1'>Poll Image  <PopoverTooltip message='Background image for the poll' /><span className='text-xs opacity-50'>(optional)</span></FormLabel>
                            <FormControl>
                                <Input onChange={(el) => { field.onChange(el.target.value.length > 0 ? el.target.value : undefined) }} placeholder='Enter image URL' type='url' defaultValue={field.value} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='type'
                    defaultValue='image'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center gap-1'>Options type <PopoverTooltip
                                message={<div className='flex flex-col gap-2'>
                                    <p>Image : <span className='opacity-80 text-sm'>The options will be images</span></p>
                                    <p>Video : <span className='opacity-80 text-sm'>The options will be youtube videos</span></p>
                                </div>

                                } />
                            </FormLabel>
                            <FormControl>
                                <Switcher
                                    activeIndex={getIndexFromValue(typeSwitcherOptions, field.value)}
                                    selecterFunction={(index: number) => {
                                        field.onChange(typeSwitcherOptions[index].title);
                                    }}
                                    elements={typeSwitcherOptions}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='style'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center gap-1'>Style <PopoverTooltip message={
                                <ol className='list-disc'>
                                    <li>Vote : The users will order the options by most favorite <span className='text-sm opacity-75'>(up to chosen amount)</span></li>
                                    <li>
                                        Tourny : Single-elimination tournament
                                        <Link className='text-violet-400 ml-1' href={'https://en.wikipedia.org/wiki/Single-elimination_tournament'} target='_blank'>(read more)</Link>
                                    </li>
                                    <li>Timed Tourny : Coming Soon!</li>
                                </ol>} /></FormLabel>
                            <FormControl>
                                <Switcher
                                    activeIndex={getIndexFromValue(styleSwitcherOptions, getTitleFromType(field.value))}
                                    selecterFunction={(index: number) => {
                                        // Update the form field with the selected value
                                        field.onChange(getPollTypeFromTitle(styleSwitcherOptions[index].title));
                                    }}
                                    elements={styleSwitcherOptions}
                                />
                            </FormControl>


                            <FormMessage />
                        </FormItem>
                    )}
                />
                {style !== 'TIER_LIST' && style !== 'TIMED_TOURNY' &&
                    <FormField
                        control={form.control}
                        name='additionalField'
                        defaultValue={formValue.additionalField}
                        render={({ field }) => {
                            const isTourny = style == 'TOURNY' ? true : false;

                            return (
                                <FormItem className='ml-4'>
                                    <FormLabel className='flex items-center gap-1'> {isTourny ? 'Random / Order' : 'Order amount'}  <PopoverTooltip message={isTourny ? <ul className='gap-2 list-disc'><li>Random : options will be against random options</li><li>Order : choose <span className='opacity-60'> (in the next step)</span> the matchups and groups. </li></ul> : 'How many options will get points. (based on their order as well)'} />{ }</FormLabel>
                                    <FormControl>
                                        {isTourny ?
                                            <Switcher
                                                activeIndex={getIndexFromValue(tournySwitchOptions, field.value as "order" | 'random')}
                                                selecterFunction={(index) => {
                                                    field.onChange(tournySwitchOptions[index]);  // Update the form field with the selected value
                                                }}
                                                elements={tournySwitchOptions}
                                            />
                                            : <Input defaultValue={field.value} step={1} max={10} min={1} type='number' onChange={(el) => { field.onChange(parseInt(el.target.value)) }} />}

                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                }

                <section className='w-full flex justify-between items-center'>
                    <Link className='underline underline-offset-2 text-violet-500' target='_blank' href='/about'>More about these options</Link>
                    <Button className='self-end' type='submit'>Next Step</Button>
                </section>

            </form>
        </Form>
    )
}

export default CreateForm