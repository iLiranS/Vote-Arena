import { genreToEmoji, getGenreBackground } from '@/lib/utils'
import { Genre } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const GenreLink: React.FC<{ genre: Genre, className?: string }> = ({ genre, className }) => {
    return (
        <Link prefetch={false} key={genre} style={{ color: getGenreBackground(genre) }} href={`/explore?genre=${genre.toLowerCase()}`} className={`flex items-center hover:bg-popover gap-2 text-sm lowercase rounded-md p-1 justify-center min-w-max ${className}`}>
            <p >{genre}</p>
            {genreToEmoji(genre)}
        </Link>
    )
}

export default GenreLink

