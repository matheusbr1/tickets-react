import React, {Component} from 'react'
import './Delete.css'

export default class Delete extends Component {

    constructor (props) {
        super(props)
        this.database = props.database
        // Captured id from URL
        this.id = window.location.search.slice(1)
        this.deletar = this.deletar.bind(this)
    }

    deletar () {
        // Parse int ID because it's string
        this.id = parseInt(this.id)

        let ticket_ref = this.database.ref('/tickets/' + this.id)
        ticket_ref.remove()
    }

    render() {
        return(
            <React.Fragment>
                 <div className="sended-message">
            <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">Warning!</h4>
                <p className="alert-heading"> Ticket {this.id}</p>
                <p className="alert-heading" >Are you sure you want to delete the ticket?</p>
            </div>
            <div className="buttons" >
                <a  onClick = {this.deletar}
                    id="btn"
                    href="/opentickets"
                    type="submit" 
                    className="btn btn-message-delete submit col-md-6"
                    >Delete
                </a>
                <a  id="btn"
                    href={"/ticketview?"+this.id}
                    type="submit" 
                    className="btn btn-message-cancel submit col-md-6"
                    >Cancel
                </a>
            </div>
        </div>
            </React.Fragment>
        )
    }    
}   