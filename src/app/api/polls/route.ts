import { getDateRange, pollFetchSchema } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// revalidation only in server component, it wont affect anything in here.
// this route handler used for poll previews only and not full poll details.
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
        const queryParams = Object.fromEntries(searchParams.entries());



        const fetchOptions = pollFetchSchema.parse(queryParams);
        console.log(fetchOptions);
        const { startDate, endDate } = getDateRange(fetchOptions.date);



        const polls = await prisma.poll.findMany({
            where: {
                ...(fetchOptions.genre ? { genre: fetchOptions.genre } : {}),
                ...(startDate ? { createdAt: { gte: startDate, lte: endDate } } : {}),
                ...(fetchOptions.match ? { title: { contains: fetchOptions.match, mode: 'insensitive' } } : {})
            },
            skip: fetchOptions.skip,
            take: fetchOptions.take,
            orderBy: {
                ...(fetchOptions.orderby === 'newest' && { createdAt: 'desc' }),
                ...(fetchOptions.orderby === 'oldest' && { createdAt: 'asc' }),
                ...(fetchOptions.orderby === 'popular' && { submissions: 'desc' }),
            },
            select: {
                id: true,
                title: true,
                submissions: true,
                type: true,
                genre: true,
                src: true
            },
        });
        return NextResponse.json(polls);

    }

    catch (err) {
        console.error(err);
        return NextResponse.json(err, { status: 500 });
    }

}