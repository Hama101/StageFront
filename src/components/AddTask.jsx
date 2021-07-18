import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import UpDateToAdmin from './UpDateToAdmin';
import AddTaskForm from './AddTaskForm';




function AddTeam() {
    const location = useLocation()
    const user = location.state
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
