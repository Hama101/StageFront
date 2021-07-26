import { useState, useEffect ,useRef} from "react";
import { useLocation } from "react-router-dom";
import axios from "./globals/axios"

import './css/newCss/chat.css'

function Chat() {
    const location = useLocation()
    const state = JSON.parse(localStorage.getItem("user"))
    const user = state
    const team = location.state
    return (
        <ChatRoom team = {team} user={user}/>
    );
}
function ChatRoom(props) {
    const username = props.user.username
    const teamName = props.team
    const intState = {
        room : teamName , 
        username : username,
        body : ""
    }
    const [message , setMessage] = useState(intState)
    const [messages , setMessages] = useState([])
    const getMessages = async ()=>{
        try{
            const url = `/roomMessages/${teamName}/`
            const req = await axios.get(url)
            console.log(req.data)
            setMessages(req.data)
        }catch(err){
            setMessages([])
        }
    }
    useEffect(()=>{
        getMessages()
    }, [])
    const handelClick = async()=>{
        try{
            const url = "/send-message/"
            console.log("sending : ", message)
            const req = await axios.post(url , message)
            setMessage(intState)
            getMessages()
            return req
        }catch(err){
            alert(err)
        }
    }
    console.log(messages);
    const divRref = useRef(null);

    useEffect(() => {
        divRref.current.scrollIntoView({ behavior: 'smooth' });
    });

    return (
            <div class="chat">
                <div class="card">
                    <div class="card-header msg_head">
                        <div class="d-flex bd-highlight">
                            <div class="img_cont">
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="" class="rounded-circle user_img"/>
                                <span class="online_icon"></span>
                            </div>
                            <div class="user_info">
                                <span>{props.team}</span>
                                <p></p>
                            </div>
                            <div class="video_cam">
                                <span><i class="fas fa-video"></i></span>
                                <span><i class="fas fa-phone"></i></span>
                            </div>
                        </div>
                        <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
                        <div class="action_menu">
                            <ul>
                                <li><i class="fas fa-user-circle"></i> View profile</li>
                                <li><i class="fas fa-users"></i> Add to close friends</li>
                                <li><i class="fas fa-plus"></i> Add to group</li>
                                <li><i class="fas fa-ban"></i> Block</li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body msg_card_body">
                        {
                            messages.map(message =>{
                                return (
                                    <ChatMessage body={message.body} send={message.username === username} date={message.send_at}/>
                                )
                            })
                        }
                        <div ref={divRref} />
                        </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <div class="input-group-append">
                                <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
                            </div>
                            <textarea name="" class="form-control type_msg" placeholder="Type your message..."
                                onChange={e => setMessage({...message , body : e.target.value})}></textarea>
                            <div class="input-group-append">
                                <span class="input-group-text send_btn"><i class="fas fa-location-arrow"
                                    onClick={()=>{
                                        handelClick()
                                    }}></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

function ChatMessage(props) {
    console.log(props.send);
    console.log(props.body);
    let date = new Date(props.date)
    console.log(date.toTimeString());
    return (
    <div>{  
        !props.send ?
        (<div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" alt=""/>
        </div>
        <div class={`msg_cotainer }`} >
            {props.body}
            <span class="msg_time">{date.toDateString()}</span>
        </div>
    </div>)
        :    (<div class="d-flex justify-content-end mb-4">
            <div class="msg_cotainer_send">
                {props.body}
                <span class="msg_time_send">{date.toDateString()}</span>
            </div>
            <div class="img_cont_msg">
        </div>
        </div>)
}</div>
);
}

export default Chat;
