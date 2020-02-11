import React, {Component} from 'react'

import { config } from './util/Firebase-config'
import firebase from 'firebase'

import Routes from './Routes'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.app = firebase.initializeApp(config)
        this.database = this.app.database()
    }

    render() {
        return(
            <Routes 
                database={this.database} 
            />
        )
    }
}