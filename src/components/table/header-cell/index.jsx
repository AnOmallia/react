import React, {Fragment} from 'react';

const HeaderCell = ({children, activeSort, onClickSort, sorting, filtering, activeFilter, fieldName})=>{
    return (
        <Fragment>
            { activeFilter ? (
                <div className='col-3'>
                    {filtering ? (
                        <input type="text" className="form-control" name={fieldName}></input>
                        ) : (
                            <button type="button" className="btn btn-light float-right">Clear</button>
                    )}
                </div>
            ) : (
                <div className='col-3'
                    onClick={onClickSort}
                >
                {sorting && (
                    <i className={`fa fa-sort${activeSort ? `-amount-${activeSort}` : ''} pr-2`}></i>
                )}
                    {children}
                </div>
            )}
        </Fragment>
    )
}

export default HeaderCell