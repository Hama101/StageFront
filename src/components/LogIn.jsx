import {useState } from "react"
import { useHistory } from "react-router-dom";
import axios from "./globals/axios"

import './css/LogIn.css'

const App = ()=>{
    const history = useHistory()
	const [error ,setError] = useState("")
    const [user , setUser] = useState({
        username : "",
        password : "",
		isAdmin : false,
		token : "",
		logedIn : false
    })
	const logIn = async ()=>{
		try{
			const url = '/login/'
			const u = {
				username : user.username ,
				password : user.password
			}
			const req  = await axios.post(url ,u )
			setUser({...user, token : req.data.token ,
								logedIn : !user.logedIn})
			return(req.data)
		}catch(err){
			setError("Username or password is incorrect !")
		}
	}
    return(
		<div>
			{
			user.logedIn  ? 
			(history.push('my-list' , user))
			:
			(<div className="centered">
			<div className="container">
		<div className="d-flex justify-content-center h-100">
			<div className="card">
				<div className="card-header">
					<h3>Sign In</h3>
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
							<input type="text" className="form-control" placeholder="username" required
							value={user.username}
							onChange = {e => {
								setUser({...user , username : e.target.value.toLowerCase()})
							}}
							/>
						</div>
						<div className="input-group form-group">
							<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" className="form-control" placeholder="password"
							value={user.password}
							onChange = {e => setUser({...user , password : e.target.value})}/>
						</div>
						<div className="row align-items-center remember">
							<input type="checkbox"/>Remember Me
						</div>
						<div>
						{
							error ? 
							(
							<div>
								<br></br>
								<div class="alert alert-danger" role="alert">
									{error}
								</div>
							</div>
							)
							:
							(<div></div>)
						}
						</div>
						<div className="form-group">
							<input type="submit" value="Login" className="btn float-right btn-warning"
							onClick={()=>{
								logIn()
							}}/>
						</div>
				</div>
				<div className="card-footer">
					<div className="d-flex justify-content-center links">
						Don't have an account?<button onClick={()=>history.push("sign-up")}>Sign Up</button>
					</div>
					<div className="d-flex justify-content-center">
						<a href="/">Forgot your password?</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
		)
		}
	</div>
	)

}

export default App