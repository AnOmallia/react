import React, { Component } from 'react'

class Dropdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
  
        this.event = new CustomEvent('close-dropdown', {
           detail: {
              self: this,
           },
        });
    }

    componentDidMount(prevState, prevProps) {
        document.body.addEventListener('click', this.handleClose);
        document.addEventListener('close-dropdown', this.closeDropDown, false);
    }
  
    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleClose);
        document.removeEventListener('close-dropdown', this.closeDropDown, false);
    }

    closeDropDown = (e)=>{
        if (this !== e.detail.self) {
            this.setState({ isOpen: false });
         }
    }
    handleClose = (e) => {
        if(!e|| e.target.id ==='toogle-dropdown'){
            document.dispatchEvent(this.event);
            return;
        }
        setTimeout(()=>{
            this.setState(()=>({
                isOpen: false
            }))
        }, 0)
    };
    
    toggleOpen = () => {
        this.setState(()=>({
            isOpen: !this.state.isOpen
        }))
    };

    render(){
        const {isOpen} =this.state
        const {id, onSelectAction, className} =this.props
        return (
            <div
                className={`dropdown d-inline-block ${className}`}
                onClick={this.toggleOpen}>
                <a className="btn btn-primary dropdown-toggle" href="#" role="button" id='toogle-dropdown'>
                    Actions
                </a>
          {isOpen &&(
            <div className="dropdown-menu show pin-right">
                <a
                    className="dropdown-item" href="#"
                    onClick={()=>{onSelectAction(id, 'delete')}}
                >
                    <i className='fas fa-trash-alt'></i>
                    <span className='pl-2'>Delete</span>
                </a>
            </div>
          )}
          </div>
        )
    }
}

export default Dropdown;