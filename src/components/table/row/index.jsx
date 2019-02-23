import React from 'react';

const Row = ({children})=>{
    return (
        <div className='row border-bottom py-2'>
            {children}
        </div>
    )
}

export default Row