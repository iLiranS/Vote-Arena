import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export async function DELETE(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json('Unauthorized', { status: 401 });

    const currentDate = new Date()
    const oneMonthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1)) // subtract 1 month from current date

    try {
        const deletedPolls = await prisma.poll.deleteMany({
            where: {
                createdAt: {
                    lt: oneMonthAgo, // delete records where createdAt is less than one month ago
                },
            },
        })
        revalidatePath('/'); // revalidate all polls.
        return NextResponse.json(`deleted : ` + deletedPolls.count + ' polls [cron job]', { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response("Failed to delete polls", { status: 500 })
    }
}