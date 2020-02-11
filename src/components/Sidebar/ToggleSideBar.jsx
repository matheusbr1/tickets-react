import React from 'react'
import './ToggleSideBar.css'

import $ from 'jquery'

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

export default () => 
<div id="buttonSideBar">
    <nav className="toggle-button navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
                <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
        </div>
    </nav>
</div>
