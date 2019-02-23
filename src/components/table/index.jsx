import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';
import Row from './row';
import Header from './header';
import HeaderCell from './header-cell';

class Table extends Component {
   static propTypes = {
      fullWidth: PropTypes.bool,
      children: PropTypes.array,
      theme: PropTypes.string,
      className: PropTypes.string,
      small: PropTypes.bool,
   };

   static defaultProps = {
    // 
   };

   constructor(props) {
      super(props);
      this.state = {
        //  
      };
   }

   render() {
      const {children} = this.props;
      const childrenArray = React.Children.map(children, (child) => {
         return child;
      });
      return (
         <div className={ `container-fluid bg-light` }>{childrenArray}</div>
      );
   }
}

export {
   Cell,
   Row,
   Header,
   HeaderCell,
};

export default Table;