'use server'
import { Poll } from "@prisma/client";
import { pollsFetchModel, pollsFetchResult } from "./models";

// fetching
export const getPoll = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/poll?id=${id}`);
        if (!res.ok) return null;
        const poll = await res.json();
        return poll as Poll;
    }
    catch (err) {
        console.error('ERROR DETECTED WHEN GETTING POLL DATA FOR ID OF ' + id, err)
        return null;
    }
}
export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/captcha`, {
            method: 'POST',
            body: JSON.stringify({ token })
        })
        if (response.status == 200) {
            return true;
        }
        else throw new Error("something went wrong with verifying captcha token");
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
// revalidates results every 2 hours.
export const getPolls = async (pollsFetchOptions: pollsFetchModel, revalidateLength: number): Promise<pollsFetchResult> => {
    const genreStr = pollsFetchOptions.genre ? `&genre=${pollsFetchOptions.genre}` : '';
    const matchStr = pollsFetchOptions.match ? `&match=${pollsFetchOptions.match}` : ''

    try {
        const fetchURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/polls?skip=${pollsFetchOptions.skip}&take=${pollsFetchOptions.take}&orderby=${pollsFetchOptions.orderby}&date=${pollsFetchOptions.date}${genreStr}${matchStr}`


        const res = await fetch(fetchURL, { next: { revalidate: revalidateLength } });
        if (!res.ok) throw new Error('failed fetching polls');
        const data: pollsFetchResult = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        return { polls: [], totalPolls: 0 }
    }
}

