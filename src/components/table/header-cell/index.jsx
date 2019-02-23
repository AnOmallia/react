import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const HeaderCell = ({
    children,
    activeSort,
    onClickSort,
    sorting,
    filter,
    filtering,
    activeFilter,
    fieldName,
    onFilterChange,
    onClearFilteringClick
})=>{
    return (
        <Fragment>
            { activeFilter ? (
                <div className='col-3'>
                    {filtering ? (
                        <input
                            type="text"
                            className="form-control"
                            name={fieldName}
                            onChange={(e)=>{onFilterChange(fieldName, e.target.value)}}
                            value={filter[fieldName] || ''}
                            ></input>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-light float-right"
                                onClick={onClearFilteringClick}
                            >
                                Clear
                            </button>
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

HeaderCell.defaultProps = {
    className: '',
};
 
HeaderCell.propTypes = {
    children: PropTypes.any,
    sort: PropTypes.object,
    onClickSort: PropTypes.func,
    activeFilter: PropTypes.bool,
    activeSort: PropTypes.string,
    filtering: PropTypes.bool,
    onFilterChange: PropTypes.func,
    onClearFilteringClick: PropTypes.func,
    filter: PropTypes.object,
    sorting: PropTypes.bool,
    fieldName: PropTypes.string,
};

export default HeaderCell
