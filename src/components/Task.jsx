import React , {useState , useEffect} from 'react'
import axios from "./globals/axios"
import "./css/oldCss/Task.css"

function Task( props  ) {
    console.log("the props id :",props.id);
    const classes = {
        "To Do" : "danger",
        "Doing" :"info",
        "Done":"success",
    }
    const [todo , setTodo]=useState({})
    const fetchData = async() =>{
        const url = `/viewTask/${props.id}/`
        try{
            const request = await axios.get(url)
            setTodo(request.data)
            return request.data
        }catch(err){
            alert(err)
        }
    }
    useEffect(()=>{
        fetchData()
    },[] )
    async function updateData(theid){
        const url = `/updateTask/${theid}/`
        try{
            const request = await axios.put(url , {...todo , checked : !todo.checked ,
                                                status :(!todo.checked ? "Done" : "Doing" )})
            return request.data
        }catch(err){
            alert(err)
        }
    }
    console.log(todo);
    const hundelClick = (id)=>{
        setTodo({...todo , checked : !todo.checked ,
                    status :(!todo.checked ? "Done" : "Doing" )})
        updateData(id)
    }
    return (
<div>
    <div className="todo-indicator bg-warning"></div>
        <div className="widget-content p-0">
            <div className="widget-content-wrapper">
                <div className="widget-content-left mr-2">
                    <div className="">
                    <button className={`btn btn-sm btn-${classes[todo.status]} btns`}
                            onClick={() =>
                            {
                                hundelClick(todo.id)
                            }
                            }>
                    </button>
                    </div>
                    </div>
                    <div className="widget-content-left">
                    <div className="widget-heading">{todo.title} <div className={`badge badge-${classes[todo.status]} ml-2 status`}>{todo.status}</div>
                    </div>
                <div className="widget-subheading"><i>Team : {todo.team}</i></div>
            </div>
            <div className="widget-content-right"> <button className="border-0 btn-transition btn btn-outline-success"> <i className="fa fa-check"></i></button> <button className="border-0 btn-transition btn btn-outline-danger"> <i className="fa fa-trash"></i> </button> </div>
        </div>
    </div>
</div>

    )
}

export default Task
