import React from 'react'
import CardContainer from '../ui/CardContainer'
import { Genre } from '@prisma/client'
import { genreToEmoji, getGenreBackground } from '@/lib/utils'
import { Button } from '../ui/button'
import GenreLink from './GenreLink'

const PollGenreList: React.FC<{ onClickForward?: (genre: Genre) => void, selectedGenre?: Genre | null }> = ({ onClickForward, selectedGenre }) => {



    return (
        <CardContainer className='md:w-[320px] w-full min-w-max  h-max mx-auto'>
            <h3 className='text-center text-lg font-semibold'>GENRES</h3>

            <ul className=' h-max grid grid-cols-3 gap-2'>
                {Object.values(Genre).map(genre =>
                    <li key={genre}>
                        {onClickForward ?
                            <Button variant='ghost' style={{ color: getGenreBackground(genre) }} onClick={(e) => { e.preventDefault(); onClickForward(genre) }}
                                className={`flex items-center hover:bg-popover gap-2 text-sm lowercase rounded-md p-1 justify-center w-full min-w-max ${selectedGenre === genre ? 'bg-popover' : ''}`}
                            >
                                <p>{genre}</p>
                                {genreToEmoji(genre)}
                            </Button>
                            :
                            <GenreLink genre={genre} />
                        }
                    </li>)}
            </ul>
        </CardContainer>
    )
}

export default PollGenreList