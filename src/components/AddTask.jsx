import React, { } from 'react'

import UpDateToAdmin from './UpDateToAdmin';
import AddTaskForm from './AddTaskForm';



function AddTeam() {
    const state = JSON.parse(localStorage.getItem("user"))
    const user = state
    return (
        <div>
            { user.isAdmin ?
            (<AddTaskForm
                user = {user} />)
            :
            (<UpDateToAdmin
                user ={user} />)}
        </div>
    )
}

export default AddTeam
