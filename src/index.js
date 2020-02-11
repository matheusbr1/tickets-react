import ReactDom from 'react-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './components/Common.css'
import Sidebar from './components/Sidebar/Sidebar'
import ToggleSideBar from './components/Sidebar/ToggleSideBar'
import App from './App'

const elemento = document.getElementById('root')
ReactDom.render(
    <div className="content" >
        <div className="wrapper" >
            <ToggleSideBar />
            <Sidebar />
            <App />
        </div>
    </div> 
, elemento)