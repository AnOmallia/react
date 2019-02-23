import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
    children,
    sort,
    onClickSort,
    activeFilter,
    onFilterChange,
    filter
})=>{
    const childrenArray = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
            activeSort: sort.field === child.props.fieldName ? sort.order : null,
            onClickSort: () => onClickSort(child.props.fieldName),
            activeFilter: activeFilter,
            onFilterChange: onFilterChange,
            filter:filter
        });
     });
    return (
        <div className='row bg-white py-2 border-bottom border-3'>
            { childrenArray }
        </div>
    )
}

Header.propTypes = {
    children: PropTypes.array,
    sort: PropTypes.object,
    onClickSort: PropTypes.func,
    activeFilter: PropTypes.bool,
    onFilterChange: PropTypes.func,
    filter: PropTypes.object,
};

export default Header
