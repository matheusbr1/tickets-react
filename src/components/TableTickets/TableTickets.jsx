import './TableTickets.css'
import React, { Component } from 'react'
import Ticket from './Ticket'

export default class TableTickets extends Component {

     constructor(props) {
        super(props)

        this.database = props.database

         this.state = {
            tickets: []
         }
     }      

     componentWillMount() {
        const data = this.state.tickets

        this.database.on('child_added', snap => {
            data.push({
                id: snap.val().id,
                nome: snap.val().nome,
                responsavel: snap.val().responsavel,
                status: snap.val().status
            })
            this.setState({
                tickets: data
            })
        })
     }

    render () {
      return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand">
                    <h4>Tickets</h4>
                </a>
                <form className="form-inline search">
                    <input className="form-control search mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-crf my-2 my-sm-0 bth-search" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                </form>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Responsible</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody id="tbory" >     
                {
                    this.state.tickets.map((ticket) => {
                        return (
                            <Ticket
                                key= {ticket.id}
                                id= {ticket.id} 
                                nome = {ticket.nome}
                                responsavel= {ticket.responsavel}
                                status= {ticket.status}
                            />
                        )
                    })
                }           
                </tbody>
            </table>
        </div>
    )
    }
}