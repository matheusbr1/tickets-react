import React, {Component} from 'react'
import './TicketView.css'

import $ from 'jquery'

export default class TicketView extends Component {

    constructor (props) {
        super(props)

        this.state = ({
            tickets:[]
        })

        this.nav = this.nav.bind(this)
        this.database = props.database
    }

    componentWillMount () {

        // Insert the captured URL id into the component state
        let id = window.location.search.slice(1)
        id = parseInt(id)
        
        // Walks the snaphot and insert in component state if the id is the some
        const data = this.state.tickets
        const ticket_ref = this.database.orderByChild('id').equalTo(id)
        ticket_ref.on('child_added', snap => {
            data.push({
                id: snap.val().id,
                nome: snap.val().nome,
                email: snap.val().email,
                area: snap.val().area,
                atividade: snap.val().atividade,
                motivo: snap.val().motivoAtividade || 'Sem preenchimento',
                especifique: snap.val().especifique || 'Sem preenchimento',
                local: snap.val().localAtividade,
                url: snap.val().url,
                arquivos: snap.val().localArquivosRede || 'Sem preenchimento',
                trello:snap.val().cardTrello || 'Sem preenchimento',
                status: snap.val().status,
                responsavel: snap.val().responsavel,
                abertura: snap.val().abertura
            })
            this.setState({
                tickets: data
            })
            console.log(this.state.tickets[0])
        })
    }

    // NavBar function
    nav (classe) {
        // Clear Active
        $(`
            .requester,
            .taks,
            .details
        `).removeClass('active')

        // Set Active
        $(`.${classe}`).addClass('active')
    }

    render() {
        var e = {}
        this.state.tickets.map((ticket) => {return(
            e.id = ticket.id,
            e.nome = ticket.nome,
            e.email  = ticket.email,
            e.area = ticket.area,
            e.atividade = ticket.atividade,
            e.motivo = ticket.motivo,
            e.especifique = ticket.especifique,
            e.local = ticket.local,
            e.url = ticket.url,
            e.arquivos = ticket.arquivos,
            e.trello = ticket.trello, 
            e.status = ticket.status,
            e.responsavel = ticket.responsavel,
            e.abertura = ticket.abertura
        )})

    return (        
        <React.Fragment>
        <div>
            <h4>Ticket Info</h4>
        </div>
        
        <div className="ticketview" >
            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <a onClick={()=> this.nav('requester')} className="nav-link requester active" href="#">Requester</a>
                </li>
                <li className="nav-item">
                    <a onClick={()=> this.nav('taks')} className="nav-link taks" href="#">Task</a>
                </li>
                <li className="nav-item">
                    <a onClick={()=> this.nav('details')} className="nav-link details" href="#">Details</a>
                </li>
                <li id="buttons-ticket-view" >
                <a
                    href={'/change?'+e.id}
                    type="submit" 
                    className="btn btn-warning submit"
                    > <i className="fa fa-pencil" aria-hidden="true"></i>
                </a>
                <a 
                    href={'/delete?'+e.id} 
                    type="submit" 
                    className="btn btn-danger submit"
                    > <i className="fa fa-trash" aria-hidden="true"></i>
                </a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane fade requester show active">
                    <p> 
                        <strong>Nome:</strong> {e.nome} <br/>
                        <strong> E-mail:</strong> {e.email} <br/>
                         <strong>Área:</strong> {e.area} 
                    </p> 
                </div>
                <div className="tab-pane fade taks show">
                    <p>
                        <strong>Atividade:</strong> {e.atividade} <br/>
                        <strong>Motivo da Atividade:</strong> {e.motivo} <br/>
                        <strong>Especifique o motivo:</strong> {e.especifique} <br/>
                        <strong>Local da atividade:</strong> {e.local} <br/>
                        <strong>URL:</strong> <a href={e.url}>{e.url}</a>
                    </p>
                    <hr/>
                    <p>
                        <strong>Local dos arquivos na rede:</strong> {e.arquivos} <br/>
                        <strong>Card no trello:</strong> {e.trello}
                    </p>
                </div>
                <div className="tab-pane fade details show">
                    <p>
                        <strong> ID: </strong> {e.id} <br/>
                        <strong> Aberto em:</strong> {e.abertura}
                    </p>
                    <hr/>
                    <p>
                        <strong>Status:</strong> {e.status} <br/>
                        <strong>Responsável:</strong> {e.responsavel}
                    </p>
                </div>
            </div>
        </div> 

    </React.Fragment>
    )}
}