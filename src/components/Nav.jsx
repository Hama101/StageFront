import axios from './globals/axios';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";

import "./css/Nav.css"
const CNav = () => {
    const history = useHistory()
    const location = useLocation()
    const user = location.state
    const logOut = ()=>{
        try{
            const url = '/logoutall/'
            const req = axios.post(url , {
                Headers : {
                    Authorization : 'token'+user.token
                }
            })
            return req
        }catch(err){
        }
    }
    return (
        <div>
            {
            location.pathname === "/" || location.pathname==="/sign-up" ?
                (<div></div>)
                :
                (
                <Navbar bg="dark" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {
                        location.pathname ==="/my-list" ? 
                        (<div></div>)
                        :
                        (<button className="previous"
                                onClick={() => history.goBack()} >
                        &laquo; Previous
                        </button>)
                    }
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <button 
                                className="btn btn-sm btn-info"
                                onClick={()=>{
                                    logOut()
                                    history.push("/")
                                }}>
                                Log Out
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                )
            }
        </div>
    )
}

export default CNav
