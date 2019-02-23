import React from 'react';

const Cell = ({children, className})=>{
    return (
        <div  className={`col-3 ${className}`}>
            {children}
        </div>
    )
}

export default Cell