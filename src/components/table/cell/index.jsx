import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ children, className })=>{
    return (
        <div  className={ `col-3 ${ className }` }>
            { children }
        </div>
    )
}

Cell.defaultProps = {
    className: '',
};

Cell.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
};

export default Cell