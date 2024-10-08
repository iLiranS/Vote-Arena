import { verifyToken } from "@/lib/fetchUtils";
import { PollSubmissionRequest } from "@/lib/models";
import { Poll, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

export async function PUT(req: Request) {

    try {

        const res = await req.json() as PollSubmissionRequest;
        const { id, results, token, winnerIndex, duels } = res;
        if (!id || !results || !token) throw new Error("invalid args");
        const isValidToken = await verifyToken(token);
        if (!isValidToken) throw new Error("invalid token");


        const poll = await prisma.poll.findUnique({ where: { id: id }, select: { id: true, totalScore: true, submissions: true, winsCount: true, totalDuels: true } });
        if (!poll || !poll.totalScore) throw new Error("could not get poll with this id.");
        const { totalScore, submissions, winsCount, totalDuels } = poll;
        const updatedWinsCount = [...winsCount];
        updatedWinsCount[winnerIndex]++;
        const updatedTotalScore = totalScore.map((score, index) => score + (results[index] ?? 0));
        let updatedPoll: Poll | null = null;
        // updatedDuels will not change if vote poll
        const updatedDuels = duels ? totalDuels.map((optionDuelsInTourny, index) => optionDuelsInTourny + (duels[index] ?? 0)) : totalDuels;

        updatedPoll = await prisma.poll.update({ where: { id: id }, data: { totalScore: updatedTotalScore, submissions: submissions + 1, winsCount: updatedWinsCount, totalDuels: updatedDuels } })

        if (!updatedPoll) throw new Error("failed updating poll results");
        //revalidatePath(`/${poll.id}/results`) // cancel this later it might make overheat issues
        return NextResponse.json("success", { status: 200 });
    }

    catch (err) {
        console.error(err);
        return NextResponse.json(err, { status: 500 });
    }

}