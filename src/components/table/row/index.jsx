import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children })=>{
    return (
        <div className='row border-bottom py-2'>
            { children }
        </div>
    )
}

Row.propTypes = {
    children: PropTypes.array,
};

export default Row