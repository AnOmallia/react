import React from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';
import Row from './row';
import Header from './header';
import HeaderCell from './header-cell';

const Table = ({ children }) => {
   const childrenArray = React.Children.map(children, (child) => {
      return child;
   });
   return (
      <div className={ `container-fluid bg-light` }>{ childrenArray }</div>
   );
}

Table.propTypes = {
   children: PropTypes.array,
};

export {
   Cell,
   Row,
   Header,
   HeaderCell,
};

export default Table;