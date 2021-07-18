import React from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './globals/axios';
import "./css/AddTask.css"

function AddTask() {
    const location = useLocation()
    const history = useHistory()
    const user = location.state
    const [todo, setTodo] = useState({
        title: "",
        discreption: "",
        delay: "",
        team: "",
        worker: "",
    })
    const [team, setTeam] = useState({
        workers :[]
    })
    const getTeam = async ()=>{
        try {
            const teamsURL = `/myTeam/${user.username}/`
            const req = await axios.get(teamsURL)
            setTeam(req.data)
            setTodo({...todo, team : req.data.id})
            return req.data
        }catch(err){
            alert(err)
        }
        
    }
    useEffect(()=>{
        getTeam()
    },[])
    const hundelClick = async(t)=>{
        console.log("Inside : " , t)
        try{
            const url = '/addTask/'
            const req = await axios.post(url , t)
            //alert("Done <3 !")
            return req.data
        }catch(err){
            alert(err)
        }
    }
    return (
        <div>
            <div className="centered">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Assgin Task</h3>
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
                                        <input type="text" className="form-control" placeholder="title" required
                                        onChange={e => setTodo({ ...todo, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <select required readOnly className="form-control" aria-label=".form-select-sm example">
                                            {
                                                team ? 
                                                (<option selected className="sel" value={team.id} >{team.name}</option>)
                                                :
                                                (<div></div>)
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <select required className="form-control" aria-label=".form-select-sm example"
                                                onChange={(e)=> {
                                                    setTodo({...todo , worker : e.target.value})
                                                }}>
                                            <option selected className="sel" value="">Select Worker</option>
                                            {
                                                team.workers.map(worker =>(
                                                    <option  className="sel" value={worker}>{worker}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="date" className="form-control" placeholder="delay" required
                                        onChange={e => setTodo({ ...todo, delay: e.target.value })}
                                        />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <textarea required placeholder="discreption ..." className="form-control" rows="4" cols="50" maxlength="200"
                                                onChange={e => setTodo({ ...todo, discreption: e.target.value })}>
                                            {todo.discreption}
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <button  value="Login" className="btn float-right btn-warning"
                                            onClick={() => {
                                                hundelClick(todo)
                                                history.push('my-team' , user)
                                            }} >
                                                Next
                                            </button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask
