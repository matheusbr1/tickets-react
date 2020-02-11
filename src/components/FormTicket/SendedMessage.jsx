import React from 'react'
import './SendedMessage.css'

export default props => {

    return (
        <div className="sended-message">
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                <p className="alert-heading" >Aww yeah, your ticket has open succesfuly! 😁 Comic soon our team will start the service! 👩🏻‍💻</p>
            </div>
            <div className="buttons" >
                <a  id="btn"
                    href="/opentickets"
                    type="submit" 
                    className="btn btn-message submit col-md-6"
                    >OK
                </a>
                <a  id="btn"
                    href="/newticket"
                    type="submit" 
                    className="btn btn-message submit col-md-6"
                    >New ticket
                </a>
            </div>
        </div>
    )
}