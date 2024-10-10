import { z } from "zod"
import { formSchema, optionSchema, pollFetchSchema } from "./utils"
import { Genre, PollType } from "@prisma/client"

export type sideBarItemProps = {
    icon: JSX.Element,
    name: string,
    active?: boolean
    textColorClass?: string
    unrotateable?: boolean
    notification?: boolean
    notificationAmount?: number
}
export type switcherElementProps = {
    title: string,
    icon: JSX.Element,
    color: string
    bg_color: string
    disabled?: boolean
}
export type optionPollForm = {
    title: string,
    source: 'video' | 'image'
    src: string,
    votes?: number
}
export interface previewPoll {
    id: string;
    title: string;
    submissions: number;
    type: PollType;
    genre: Genre;
    src: string;
}

export type pollsFetchResult = {
    polls: previewPoll[],
    totalPolls: number
}

export type createFormModel = z.infer<typeof formSchema>;
export type createOptionFormModel = z.infer<typeof optionSchema>;
export type pollsFetchModel = z.infer<typeof pollFetchSchema>;

export interface PollSubmissionRequest {
    results: number[];
    id: string;
    token: string;
    winnerIndex: number;
    duels?: number[]
}

export interface PollCreateRequest {
    options: createOptionFormModel[],
    formData: createFormModel,
    captchaToken: string
}
export type PollResultOption = optionPollForm & { score: number, percent: number, winCount: number }
export type TournyOption = optionPollForm & { indexInInitial: number }

export interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export const containerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}
export const itemVariant = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 }
}

export interface tournyResult {
    winsCount: number[]
    duelCount: number[]
}
