import { verifyToken } from "@/lib/fetchUtils";
import { PollCreateRequest } from "@/lib/models";
import { generateRandomColor } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';


export async function POST(req: Request) {

    try {
        const res = await req.json() as PollCreateRequest;
        const { options, formData, captchaToken } = res
        if (!options || !formData || !captchaToken) throw new Error("invalid arguments");
        const isValidToken = await verifyToken(captchaToken);
        if (!isValidToken) throw new Error("invalid token");
        const emptyZeroArr = Array.from({ length: options.length }).fill(0) as number[];
        const poll = await prisma.poll.create({
            data: {
                title: formData.title,
                genre: formData.genre,
                isVideo: formData.type === 'video',
                src: formData.image ?? generateRandomColor(),
                additionalField: formData.additionalField,
                options: JSON.stringify(options),
                type: formData.style === 'tourny' ? 'TOURNY' : 'VOTE',
                totalScore: emptyZeroArr,
                winsCount: emptyZeroArr,
                totalDuels: emptyZeroArr
            }
        })
        if (!poll) throw new Error("failed creating poll");
        // revalidate exisitng polls
        revalidatePath(`/${poll.id}`)
        return NextResponse.json(poll.id);

    }
    catch (err: unknown) {
        console.log(err);
        return NextResponse.json(err, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json('id was not given.', { status: 404 });
    }
    let poll;
    try {
        poll = await prisma.poll.findUnique({ where: { id: id } });
        if (!poll) return NextResponse.json('invalid Id', { status: 404 });
        return NextResponse.json(poll);
    }
    catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}