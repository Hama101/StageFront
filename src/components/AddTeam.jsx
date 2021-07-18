import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import UpDateToAdmin from './UpDateToAdmin';
import AddTeamForm from './AddTeamForm';




function AddTeam() {
    const location = useLocation()
    const user = location.state
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
