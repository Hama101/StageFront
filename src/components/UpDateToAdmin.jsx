import React, { useState ,useEffect} from 'react'
import { useHistory } from 'react-router'

import axios from "./globals/axios"

function UpDateToAdmin(user) {
    const history = useHistory()
    const [ask , setAsk] = useState({
        username : user.user.username
    })
    useEffect(()=>{
        async function getWorkerId(){
            const url = `/getUserIds/${user.user.username}/`
            try {
                const req = await axios.get(url)
                setAsk({...ask, worker : req.data.worker})
                return req
            } catch (err) {
                alert(err)
            }
        }
        getWorkerId()
    } ,[])
    const hundelClick = async ()=>{
        const url = "/ask/"
        try {
            const req = await axios.post(url , ask)
            return req
        } catch (err) {
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
                                <h3>Why would you be a leader</h3>
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
                                        <textarea 
                                            placeholder="dis..."
                                            className="form-control"
                                            onChange={(e)=>{
                                                setAsk({...ask, discreption : e.target.value})
                                            }}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <button  value="Login" className="btn float-right btn-warning"
                                            onClick={()=>{
                                                hundelClick()
                                                history.push("my-List" ,user.user)
                                            }}>
                                                
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

export default UpDateToAdmin
