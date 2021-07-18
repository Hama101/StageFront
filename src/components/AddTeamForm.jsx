import React from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './globals/axios';
import Select from 'react-select'


function AddTeamForm() {
    const location = useLocation()
    const history = useHistory()
    const user = location.state
    const [leader, setLeader] = useState({})
    const getLeaderId = async () => {
        const url = `/getUserIds/${user.username}/`
        try {
            const req = await axios.get(url)
            setLeader(req.data)
            return req
        } catch (err) {
            alert(err)
        }
    }
    const [team, setTeam] = useState({})
    const [workers, setWorkers] = useState([])
    const getWorkers = async () => {
        const url = `/workers/`
        try {
            const req = await axios.get(url)
            setWorkers(req.data)
            return req
        } catch (err) {
            alert(err)
        }
    }
    useEffect(() => {
        getLeaderId()
        getWorkers()
    }, [])
    const handleChange = (selectedOptions) => {
        let workers = [];
        selectedOptions.map(o =>
            workers.push(o.value)
        )
        setTeam({ ...team, workers: workers })
    }
    const addTeam = async()=>{
        const url = `/addTeam/`
        try{
            const req = await axios.post(url , team)
            return req
        }catch(err){
            alert (err)
        }
        
    }
    return (
        <div>
            <div>
                <div className="centered">
                    <div className="container">
                        <div className="d-flex justify-content-center h-100">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Start Your Team</h3>
                                    <div className="d-flex justify-content-end social_icon">
                                        <span><i className="fab fa-facebook-square"></i></span>
                                        <span><i className="fab fa-google-plus-square"></i></span>
                                        <span><i className="fab fa-twitter-square"></i></span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="name" required
                                            onChange={(e) => setTeam({
                                                ...team,
                                                leader: leader.leader,
                                                name: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <select required className="form-control" aria-label=".form-select-sm example">
                                            <option selected readonly className="sel" value={user.username}>{user.username}</option>
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        <Select
                                            isMulti
                                            closeMenuOnSelect={false}
                                            className="form-control"
                                            options={workers}
                                            onChange={handleChange}
                                            onRemove={""}
                                            displayValue="name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button value="Login" className="btn float-right btn-warning"
                                        onClick={()=>{
                                                addTeam()
                                                history.push("my-team", user)
                                        }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddTeamForm
