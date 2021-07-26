import axios from './globals/axios';
import { useHistory, useLocation } from "react-router-dom";


import "./css/oldCss/Nav.css"
const CNav = () => {
    const history = useHistory()
    const location = useLocation()
    const state = JSON.parse(localStorage.getItem("user"))
    const user = state
    const logOut = ()=>{
        try{
            const url = '/logout/'
            const req = axios.post(url , {
                Headers : {
                    Authorization : 'token'+user.token
                }
            })
            localStorage.setItem('user', "{}" )
            history.push('/')
            return req
        }catch(err){
        }
    }
    const goToRoom = (team)=>{
        history.push("/chat-room",{team})
    }
    return (

        <div className="">
            {
            location.pathname === "/" || location.pathname==="/sign-up" ?
                (<div></div>)
                :
                (
                <div className="nav">
                    <div className="box">
                        {location.pathname !=="/my-list" ? 
                        (<button className="btn btn-sm btn-warning" onClick = {()=>history.goBack()}>{"<<"}</button>)
                        :
                        (<div></div>)}
                <button className="btn btn-sm btn-danger" style={{alignSelf:"flex-end"}} onClick = {()=>logOut()}><i class="fa fa-power-off" aria-hidden="true"></i></button>
                </div>
            <select id="nav_v2" onchange="window.location.href = this.options[this.selectedIndex].value"
                onChange={(e)=>{
                    console.log(e.target.value)
                    if (e.target.value === "Log Out")
                        logOut()
                    else
                        goToRoom(e.target.value)
                }}>
                
                <option selected="selected" value="">Rooms</option>
                    <option value="Room1"> #Room 1 </option>
                </select>
                </div>
                )
            }
        </div>
    )
}

export default CNav
