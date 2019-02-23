import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Dropdown from '../../components/dropdown'
import Dialog from '../../components/dialog'
import Table, { Row, Cell, Header, HeaderCell } from '../../components/table';


class IpAddressesTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            initialData: '',
            sort: {
                field: 'name',
                order: 'asc'
            },
            filter: {},
            openDialog: false,
            activeFilter: false,
        }
        this.dialogData = {}
    }
    componentDidMount(){
        axios.get('./data.json').then((response)=>{
            const { status, data } = response
            if(status===200){
                this.setState(()=>({
                    data: data.data,
                    initialData: JSON.stringify(data.data)
                }))
            }
        }).catch((error)=>{
            console.error(error)
        })
    }

    handleSort = (field) => {
        const { sort } = this.state
        const data = JSON.parse(JSON.stringify(this.state.data))
        const newSort = {
            field: field,
            order: 'asc'
        }
        
        if(sort.field === field){
            newSort.order = sort.order === 'asc' ? 'desc' : 'asc';
        }
        this.sorting(newSort.order, data, field)
        this.setState(()=>({
            sort:newSort,
            data,
        }))
    }

    sorting = (order, data, field)=>{
        if(order === 'asc'){
            data.sort((a, b)=> {
                if(typeof a[field] === 'string'){
                    return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)
                } else{
                    const s1 = this.sorting(order, a[field], 'port_name')
                    const s2 = this.sorting(order, b[field], 'port_name')
                    return (s1[0]['port_name'] > s2[0]['port_name']) ? 1 : ((s2[0]['port_name'] > s1[0]['port_name']) ? -1 : 0)
                }
            })
        } else {
            data.sort((a, b)=> {
                if(typeof a[field] === 'string'){
                    return (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0)
                } else{
                    const s1 = this.sorting(order, a[field], 'port_name')
                    const s2 = this.sorting(order, b[field], 'port_name')
                    return (s1[0]['port_name'] < s2[0]['port_name']) ? 1 : ((s2[0]['port_name'] < s1[0]['port_name']) ? -1 : 0)
                }
            })
        }
        return data
    }

    handleSelectAction=(id, action)=>{
        const {data} = this.state;
        const item =data.find((elem)=>(elem.id === id))
        if(action === 'delete'){
            this.dialogData={
                title: `Delete "${item.name}"`,
                description: 'Are you sure you want to delete?',
                actionText: 'Delete',
                action: ()=>{this.handleDeleteClick(id)},
                onClose: this.handleCloseDialog,
            }
        }
        this.setState(()=>({ openDialog: true }))
    }

    handleDeleteClick = (id)=>{
        const data = this.state.data.filter((elem)=>(elem.id !== id))
        this.setState(()=>({
            data,
            openDialog: false,
        }))
        // Here should be call to delete item from database
    }

    handleCloseDialog = () => {
        this.setState(()=>({ openDialog: false }))
    }

    handleFilterClick = () => {
        this.setState((oldState) => ({ activeFilter: !oldState.activeFilter }))
    }

    handleFilterChange = (key, value)=>{
        const data = JSON.parse(this.state.initialData)
        this.setState((oldState)=>({
            filter: { ...oldState.filter, [key]: value }
        }), ()=>{
            const {filter} = this.state;
            const newData = data.filter((item) => {
                return Object.keys(filter).every((key) => {
                    if(typeof item[key] === 'string'){
                        return item[key].toLowerCase().indexOf(filter[key].toLowerCase()) !== -1;
                    } else {
                        return item[key].some(element => {
                            return element.port_name.toLowerCase().indexOf(filter[key].toLowerCase()) !== -1
                        });
                    }
                })
            })
            this.setState(() => ({ data: newData}))
        })
    }

    handleClearFilteringClick = () => {
        this.setState((oldState)=>({
            filter: {},
            data: JSON.parse(oldState.initialData)
        }))
    }

    render(){
        const {sort, data, openDialog, activeFilter, filter} = this.state
        return(
            <Fragment>
                {openDialog && (
                    <Dialog
                        show={openDialog}
                        title={this.dialogData.title}
                        description={this.dialogData.description}
                        actionText={this.dialogData.actionText}
                        action={this.dialogData.action}
                        onClose={this.dialogData.onClose}
                    />
                )}
                <div className='bg-light py-2 px-2 overflow-auto'>
                    <i className="fa fa-ellipsis-v float-left" aria-hidden="true"></i>
                    <button
                        type="button"
                        className="btn btn-light float-right"
                        onClick={this.handleFilterClick}
                    >
                        <i className='fas fa-filter'></i>
                        Filter
                    </button>
                </div>
                <Table>
                    <Header
                        sort={sort}
                        onClickSort={this.handleSort}
                        activeFilter={activeFilter}
                        onFilterChange={this.handleFilterChange}
                        filter={filter}
                    >
                        <HeaderCell
                            fieldName='name'
                            sorting
                            filtering
                        >
                            Name
                        </HeaderCell>
                        <HeaderCell
                            fieldName='ip_address'
                            sorting
                            filtering
                        >
                            IP Address
                        </HeaderCell>
                        <HeaderCell
                            fieldName='ports'
                            sorting
                            filtering
                        >
                            Ports
                        </HeaderCell>
                        <HeaderCell
                            onClearFilteringClick={this.handleClearFilteringClick}
                        >
                            Action
                        </HeaderCell>
                    </Header>

                { data && data.map((row) => (
                    <Row
                        key={row.id}
                    >
                        <Cell>{row.name}</Cell>
                        <Cell><span className={ `${row.anycast.length ? 'font-weight-bold' : 'font-weight-normal'}`}>{row.ip_address}</span>{` ${row.anycast.length ? '[ANYCAST]': ''}`}</Cell>
                        <Cell>
                            {row.ports.map((port, index)=>(
                                <div
                                    key={index}
                                    className='d-flex flex-column border rounded bg-white p-2'>
                                    <div>
                                        <i className='fas fa-ethernet text-success'></i>
                                        <span className='pl-2'>{`${port.port_description ? port.port_description : ''} (${port.port_name})@${port.switch}`}</span>
                                    </div>
                                    <div>
                                        <span className='text-light bg-danger rounded d-inline-block px-2'>{`bgp: ${port.bgp}; prefix: ${port.prefix}; time: ${port.time}`}</span>
                                    </div>
                                </div>
                            ))}
                        { row.port }
                        </Cell>
                        <Cell>
                            <Dropdown
                                id={ row.id }
                                onSelectAction={this.handleSelectAction}
                                className='float-right'
                            />
                        </Cell>
                    </Row>
                ))}
                </Table>
            </Fragment>
        )
    }

}

export default IpAddressesTable