import React from 'react'
import './Sidebar.css'

export default () => 
<nav id="sidebar">
    <div className="sidebar-header">
        <h3>Carrefour Tickets</h3>
    </div>

    <ul className="list-unstyled components">
        <p>Options</p>
        <li>
            <a href="/newticket">New Ticket</a>
        </li>
        <li>
            <a href="/opentickets">Open Tickets</a>
        </li>
        <li>
            <a href="#">Closed Tickets</a>
        </li>
        <li>
            <a href="#">Your solved tickets</a>
        </li>
        <li>
            <a href="#">Your closed tickets</a>
        </li>
    </ul>
</nav>