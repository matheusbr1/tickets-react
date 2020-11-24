import React from 'react'
import './Filter.css'

export default props => {

    const database = props.database

    const dataFilter = () => {
        var data = document.getElementById('search').value
        var filter = document.getElementById('select-search').value

        const checkType = (data) => {
            if (Number.isInteger(parseInt(data)) === false) {
                console.log('String')
            } else {
                console.log('Number')
            }
        }

        switch (filter) {
            case 'id':
                console.log('id')
                checkType(data)
                break;
            case 'name':
                console.log('name')
                checkType(data)
                break
            case 'responsible':
                checkType(data)
                console.log('responsible')
        }

        var consult = database

        consult.on('value', snap => {
            console.log(snap.val())
        })

        // firebaseRef.orderByChild(userKey).equalTo(true / false).on("child_added", function (Data) {
        //     console.log(Data.val(), Data.key);
        // }
    }

    return (
        <form className="form-inline search">
            <div className="form-select-search">
                <select className="form-control" id="select-search">
                    <option value="id" >ID</option>
                    <option value="name" >Name</option>
                    <option value="responsible" >Responsible</option>
                </select>
            </div>
            <input className="form-control search mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="search"></input>
            <a onClick={dataFilter} type="submit" className="btn btn-outline-crf my-2 my-sm-0 bth-search"><i className="fa fa-search" aria-hidden="true"></i></a>
        </form>
    )
}