import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';
import Row from './row';
import Header from './header';
import HeaderCell from './header-cell';
// import './index.css';

class Table extends Component {
   static propTypes = {
      fullWidth: PropTypes.bool,
      children: PropTypes.array,
      theme: PropTypes.string,
      className: PropTypes.string,
      small: PropTypes.bool,
   };

   static defaultProps = {
    //   theme: 'blue',
    //   className: '',
   };

   constructor(props) {
      super(props);
      this.state = {
        //  activeIndex: 0,
      };
   }

   render() {
      const {children} = this.props;
    //   const { activeIndex } = this.state;
      const childrenArray = React.Children.map(children, (child) => {
        //  if (child.type.displayName === Header.displayName) {
            // return React.cloneElement(child, {
            //    activeIndex,
            //    theme,
            // });
        //  } else if (child.type.displayName === Row.displayName) {
        //     return React.cloneElement(child, {
        //        activeIndex,
        //        fullWidth,
        //        small,
        //        theme,
        //        onActivate: (changedActiveIndex) => this.setState({ activeIndex: changedActiveIndex }),
        //     });
        //  }
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