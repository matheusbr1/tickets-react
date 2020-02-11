import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"
import './components/Common.css'

import FormTicket from './components/FormTicket/FormTicket'
import SendedMessage from './components/FormTicket/SendedMessage'

import TableTickets from './components/TableTickets/TableTickets'
import TicketView from './components/TicketView/TicketView'

import Delete from './components/TicketView/Delete'
import Change from './components/TicketView/Change'

import '../node_modules/font-awesome/css/font-awesome.min.css';

export default props => {

    let ref_database = props.database.ref('tickets')
    let database = props.database

    return (
        <Router>
            <Route exact path="/" render={props => <TableTickets database={ref_database}/>}/>

            <Route exact path="/newticket" render={props => <FormTicket database={ref_database}/>}/>
            <Route exact path="/sended" render={props => <SendedMessage/>}/>

            <Route exact path="/opentickets" render={props => <TableTickets database={ref_database}/>}/>
            
            <Route exact path="/ticketview" render={props => <TicketView database={ref_database}/>}/>

            <Route exact path="/change" render={props => <Change database={ref_database}/>}/>


            {/* The Database is Missing the reference because need built a request with it in the component */}
            <Route exact path="/delete" render={props => <Delete database={database}/>}/>
        </Router>
    )
}