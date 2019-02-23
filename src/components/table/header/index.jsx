import React from 'react';

const Header = ({children, sort, onClickSort})=>{
    const childrenArray = React.Children.map(children, (child, index) => {
        // console.log('child',child)
        return React.cloneElement(child, {
            activeSort: sort.field === child.props.fieldName ? sort.order : null,

            onClickSort: () => onClickSort(child.props.fieldName),
        });
     });
    return (
        <div className='row bg-white py-2 border-bottom border-3'>
            {childrenArray}
        </div>
    )
}

export default Header
