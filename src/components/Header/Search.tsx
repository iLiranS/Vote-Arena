import React, { useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaSearch } from "react-icons/fa"; import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import PollGenreList from '../Polls/PollGenreList';
import { Genre } from '@prisma/client';


const Search = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const router = useRouter();

    const submitSearchHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputRef.current) return;
        let isTextValid = true;
        const text = inputRef.current.value.trim();
        if (text.length < 2 || text.length > 40) isTextValid = false;
        if (!isTextValid && !selectedGenre) return;
        setOpen(false);
        if (!selectedGenre && isTextValid) router.push(`/explore?search=${text}`);
        else if (selectedGenre && !isTextValid) router.push(`/explore?genre=${selectedGenre.toLowerCase()}`);
        else router.push(`/explore?genre=${(selectedGenre as string).toLowerCase()}&search=${text}`);
        window.location.reload();
    }
    const onGenreSelectionHandler = (genre: Genre) => {
        setSelectedGenre(genre);
    }
    const toggleOpenHandler = (status: boolean) => {
        setOpen(status);
        setSelectedGenre(null);
    }

    return (
        <Dialog onOpenChange={toggleOpenHandler} open={open}>
            <DialogTrigger asChild={true}>
                <Button variant='outline' size='icon' className='border-popover border-2'>
                    <FaSearch />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={submitSearchHandler} className='w-full flex flex-col gap-2'>
                            <div className='flex items-center gap-2 justify-between'>
                                <Input minLength={2} maxLength={40} ref={inputRef} type='text' placeholder='Enter title...' />
                                <Button type='submit' className='border-2 border-popover' variant='outline' size={'icon'}><FaSearch /></Button>
                            </div>
                            <p className='text-xs text-center'> Search in genre (optional)</p>
                            <PollGenreList onClickForward={onGenreSelectionHandler} selectedGenre={selectedGenre} />
                            {selectedGenre ? <Button onClick={(e) => { e.preventDefault(); setSelectedGenre(null) }} className='w-fit self-center border-2' variant='ghost'>Clear genre</Button> : <span className='h-10'></span>}
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Search