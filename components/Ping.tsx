import React from 'react'

const Ping = () => {
    return (
        <div className='relative'>
            <div className="absolute -left-4 top-1">
                <div className="flex size-[11px]">
                    <span className="absolute inline-flex w-full h-full animate-ping rounded-full bg-primary/75"></span>
                    <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
                </div>
            </div>
        </div>
    )
}

export default Ping