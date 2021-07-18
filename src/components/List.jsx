import React , {useState , useEffect } from 'react'
import "./css/oldCss/List.css"
import { useLocation  , useHistory} from "react-router-dom";
import axios from "./globals/axios";
import Task from './Task';

const List = () => {
    const history = useHistory()
    const location = useLocation()
    let [todos, setToDos] = useState([])
    let [user , setUser] = useState(location.state)
    
    //for data fetch
    const fetchData = async() =>{
        const url = `/todos/${user['username']}/`
        try{
            const request = await axios.get(url)
            setToDos(request.data)
            return request.data
        }catch(err){
            alert(err)
        }
    }
    function updateData(){
        setToDos(fetchData())
    }
    useEffect(()=>{
        const checkIfAdminUser = async () => {
            const url = `/isAdminUser/${user.username}/`
            const req = await axios.get(url)
            setUser({...user , isAdmin : req.data.isAdmin})
            return req.data
        }
        checkIfAdminUser()  
        updateData()
    }, [])
    return (
        <div className="row d-flex justify-content-center container">
        <div className="col-md-8">
            <div className="card-hover-shadow-2x mb-3 card">
                <div className="card-header-tab card-header">
                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal task-text"><i className="fa fa-tasks"></i>&nbsp;My List</div>
                    <div className="d-flex justify-content-end social_icon">
                        <span><i className="fab fa-facebook-square"></i></span>
                        <span><i className="fab fa-google-plus-square"></i></span>
                        <span><i className="fab fa-twitter-square"></i></span>
                    </div>
                </div>
                <div className="scroll-area-sm">
                    <perfect-scrollbar className="ps-show-limits">
                        <div style={{position: "static"}} className="ps ps--active-y">
                            <div className="ps-content">
                                {todos.length > 0 ? (
                                <ul className=" list-group list-group-flush">
                                    {todos.map((todo) =>
                                    {
                                        console.log(todo.id,'########');
                                        return (
                                        <li className="list-group-item">
                                            <Task key = "{todo.id}" id = {todo.id}/>
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
                <div className="d-block card-footer">
                    <div className="b">
                    <button className="btn btn-primary"
                            onClick={()=>history.push('add-task', user)} >Add Task</button>
                    {user.isAdmin ? 
                        (
                        <button className="btn btn-success "
                            onClick={()=>history.push('my-team', user)} >My Team</button>)
                        :
                        (<div></div>)
                    }
                    <button className="btn btn-info "
                            onClick={()=>history.push('add-team', user)} >Start Team</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
}

export default List
