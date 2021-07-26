import {useState } from "react"
import { useHistory } from "react-router-dom";
import axios from "./globals/axios"
import './css/oldCss/LogIn.css'
import Alert from "./Alert";

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
			localStorage.setItem('user', JSON.stringify({...user}) )
			return(req.data)
		}catch(err){
			setError("Username or password is incorrect !")
		}
	}
	localStorage.setItem('user', JSON.stringify({...user}) )
	return(
		<div>
			{
				user.logedIn ? 
				(history.push('my-list' , user)) 
				: 
				(<div>
					<br /><br /><br /><br /><br /> <br />
					<div class="container">
						<div class="login-singup shadow">
							<div class="login  text-center">
								<div class="d-flex">
									<div class="login-form">
										<div class="h1 text-purple text-uppercase">LOG IN </div>
											<div class="sociel-media mt-4 d-flex justify-content-center">
										</div>
									<div class="form-group">
										<input type="text"  id="email-1" placeholder="Username" required
										onChange = {e => setUser({...user , username : e.target.value})}/>
									</div>
									<div class="form-group">
										<input type="password"  id="password-1" placeholder="Password" required
											onChange = {e => setUser({...user , password : e.target.value})}/>
									</div>
									<div>
										{
											error ? 
											(
											<div >
												<Alert dakey = "" error = {error}/>
											</div>
											)
											:
											(<div></div>)
										}
									</div>
									<br />
									<button class="btn-purple"
											onClick={()=>{
												logIn()
											}}>LOG IN</button>
									<br />
									<br />
								<p class="text-capitalize text-secondary d-md-none">i don't have account!<button
										class="btn btn-link" type="button" id="toggle-4"
											onClick={()=>history.push("sign-up")}>
											SIGN UP
									</button></p>
									<a href="/" class="text-capitalize text-secondary">Forget your Password ? </a>
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