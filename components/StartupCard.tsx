import { formatDate } from '@/lib/utils'
import { Eye, EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity.types'

export type StartupCardType = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({ post }: { post: StartupCardType }) => {
    const {
        _id,
        _createdAt,
        views,
        author,
        description,
        image,
        category,
        title
    } = post;

    const authorId = author?._id;
    const name = author?.name || "Unknown Author";

    return (
        <li className='startup-card group'>
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1 5">
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>

            <div className="flex-between gap-5 mt-5">
                <div className="flex-1">
                    <Link href={`/users/${authorId}`}>
                        <p className='text-16-medium line-clamp-1'>
                            {name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>

                <Link href={`/users/${authorId}`}>
                    <Image 
                        src={author?.image || 'https://www.svgrepo.com/show/503076/profile.svg'} 
                        alt={author?.name!} 
                        width={48} 
                        height={48} 
                        className='rounded-full' 
                    />
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>

                <img src={image} alt="placehgolder" className='startup-card_img' />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard