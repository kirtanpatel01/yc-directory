import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_BY_ID } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View = async ({ id }: { id: string }) => {
    const result = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_BY_ID, { id });
    const totalViews = result?.views || 0;

    after(
        async () => 
            await writeClient
                .patch(id)
                .set({ views: totalViews + 1 })
                .commit()
    )

    return (
        <div className='view-container'>
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">
                    {totalViews} Views
                </span>
            </p>
        </div>
    )
}

export default View