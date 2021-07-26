import React, {  } from 'react'

import UpDateToAdmin from './UpDateToAdmin';
import AddTeamForm from './AddTeamForm';




function AddTeam() {
    const state = JSON.parse(localStorage.getItem("user"))
    const user =state
    console.log(user.isAdmin)
    return (
        <div>
            { user.isAdmin ?
            (<AddTeamForm
                user = {user} />)
            :
            (<UpDateToAdmin
                user ={user} />)}
        </div>
    )
}

export default AddTeam
