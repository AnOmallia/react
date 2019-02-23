import React from 'react';

const HeaderCell = ({children, activeSort, onClickSort, sorting, filtering})=>{
    return (
        <div className='col-3'
            onClick={onClickSort}
        >
        {sorting && (
            <i className={`fa fa-sort${activeSort ? `-amount-${activeSort}` : ''} pr-2`}></i>
        )}
            {children}
        </div>
    )
}

export default HeaderCell