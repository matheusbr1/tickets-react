import React, { Component } from 'react'

export default class Ticket extends Component {

     constructor(props) {
        super(props)
        this.id = props.id
        this.nome = props.nome
        this.responsavel = props.responsavel
        this.status = props.status
     }      
    
    render (props) {
        return (
            <tr>
                <td>{this.id}</td>
                <td>{this.nome}</td>
                <td>{this.responsavel}</td>
                <td>{this.status}</td>
                <td><a className="btn btn-crf"  href={'/ticketview?'+this.id} role="button">
                    Access <i className="fa fa-share-square" aria-hidden="true"></i>
                </a></td>
            </tr>
        )
    }   
}