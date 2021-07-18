import { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from "./globals/axios"
import Task from './Task'

function MyTeam() {
    const location = useLocation()
    const user = location.state


    const [team , setTeam] = useState({})
    const [todos , setToDos] = useState([])
    
    useEffect(()=>{
        async function getTeam(){
            try{
                const url = `/myTeam/${user.username}/`
                console.log(url);
                const req = await axios.get(url)
                console.log(req.data)
                setTeam(req.data)
                return req
            }catch(err){
                alert(err)
            }
        }
        getTeam()
    } ,[])

    const getToDos = async(name) =>{
        if (name !== ""){
            const url = `/todos/${name}/`
            try{
                const request = await axios.get(url)
                setToDos([])
                const res = request.data.filter(todo => todo.team === team.id)
                setToDos(res)
                return request.data
            }catch(err){
                alert(err)
            }
        }else{
            setToDos([])
        }
    }

    return (
        <div>
        <div className="centered">
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>My Team</h3>
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
                                    <select required className="form-control" aria-label=".form-select-sm example"
                                            >
                                        <option selected className="sel" value={team.id} >{team.name}</option>
                                        
                                    </select>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <select required className="form-control" aria-label=".form-select-sm example"
                                            onChange={e=>{
                                                getToDos(e.target.value)
                                                
                                            }}>
                                                <option className="sel" value="" >Select Worker</option>
                                        {
                                            team.workers ? (
                                                team.workers.map(worker =>{
                                                return <option className="sel" 
                                                value={worker} >
                                                {worker}</option>
                                            }))
                                            :
                                            (<div className="loader"></div>)
                                        }
                                    </select>
                                </div>
                                <perfect-scrollbar className="ps-show-limits">
                        <div style={{position: "static"}} className="ps ps--active-y">
                            <div className="ps-content">
                                {todos.length > 0 ? (
                                <ul className=" list-group list-group-flush">
                                    {todos.map((todo) =>
                                    {
                                        return (
                                        <li className="list-group-item">
                                            <Task id = {todo.id}/>
                                        </li>
                                        )
                                    })}
                                </ul>
                                )
                                :
                                (<div class="loader"></div>)}
                            </div>
                        </div>
                    </perfect-scrollbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default MyTeam
