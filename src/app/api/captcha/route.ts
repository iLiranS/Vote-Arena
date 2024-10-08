import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const res = await req.json();
        const { token } = res
        const response = await fetch(`https://api.hcaptcha.com/siteverify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${token}`,
        });
        const data = await response.json();
        if (data.success) {
            return NextResponse.json({ status: 200 });
        }
        else throw new Error("verification failed");

    }
    catch (err) {
        console.log(err);
        return NextResponse.json(err, { status: 500 });
    }
}