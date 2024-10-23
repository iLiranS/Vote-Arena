import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
    'https://www.votearena.online',
    'https://www.votearena.vercel.app'
]

const allowedCrawlers = [
    'Googlebot',  // Google crawler
    'Bingbot',    // Bing crawler
    'DuckDuckBot' // DuckDuckGo crawler
]

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
    const origin = request.headers.get('origin') ?? ''
    const userAgent = request.headers.get('user-agent') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin)

    // Allow if the request is from an allowed origin
    if (isAllowedOrigin) {
        return handleCors(request, origin)
    }

    // Allow known search engine crawlers
    if (allowedCrawlers.some(crawler => userAgent.includes(crawler))) {
        return handleCors(request, '*') // Allow access for crawlers
    }

    // Handle preflight requests
    const isPreflight = request.method === 'OPTIONS'
    if (isPreflight) {
        const preflightHeaders: Record<string, string> = { ...corsOptions }

        if (isAllowedOrigin) {
            preflightHeaders['Access-Control-Allow-Origin'] = origin
        }
        return NextResponse.json({}, { headers: preflightHeaders })
    }

    // Block all other origins
    return new NextResponse('Forbidden', { status: 403 })
}

function handleCors(request: NextRequest, origin: string) {
    const response = NextResponse.next()

    response.headers.set('Access-Control-Allow-Origin', origin)
    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    return response
}

export const config = {
    matcher: '/api/:path*',
}
