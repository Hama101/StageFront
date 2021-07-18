import React , {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Alert from './Alert'
import axios from "./globals/axios"

function SignUp() {
    const history = useHistory()
	const [error , setError] = useState()
	const [status, setStatus] = useState(false)
    const [user , setUser] = useState({
        username : "",
        email : "",
        password : "",
        password2 : "",
    })
	const  handelClick = async()=>{
		setError()
		try{
			const url = `/signup/`
			const req = await axios.post(url , user)
			console.log(req.status)
			if (req.status === 200 ){
				console.log(req.data)
				setError(req.data)
				if (req.data.response){
					setStatus(true)
					console.log(req.data.response);
				}
			}
			return req
		}catch(err){
			setError({"password":"password must match !"})
			console.warn(err);
		}
	}
	console.log(user);
	console.log(error)
	console.log(status)
    return (
		<div>
			
			<br /><br /><br /><br />
			{
				!status ? 
				(<div>
					<br /><br /><br /><br />
					<div class="container">
						<div class="login-singup shadow">
							<div class="login  text-center">
								<div class="d-flex">
									<div class="login-form">
										<div class="h1 text-purple text-uppercase">SIGN UP </div>
										<br />
									<div class="form-group">
										<input type="text"  id="username" placeholder="Username" required
											onChange = {(e)=>setUser({...user, username : e.target.value})}/>
									</div>
									<div class="form-group">
										<input type="text"  id="email" placeholder="Email" required
										onChange = {(e)=>setUser({...user, email : e.target.value})}/>
									</div>
									<div class="form-group">
										<input type="password"  id="password-1" placeholder="Password" required
										onChange = {(e)=>setUser({...user, password : e.target.value})}/>
									</div>
									<div class="form-group">
										<input type="password"  id="password-2" placeholder="Confirm Password"
										onChange = {(e)=>setUser({...user, password2 : e.target.value})}/>
									</div>
									{
			error ? 
			(
			<div>
				<div >
					{
						Object.keys(error).map(key => 
							{console.log(key)
							return<Alert daKey={key+ " :"} error={error[key]}/>
							})
					}
				</div>
			</div>
			)
			:
			(<div></div>)
			}
									<br />
									<div class="text-purple text-uppercase">
									<button class="btn-purple" 
										onClick={()=>handelClick()}>SIGN UP</button>
									<br /><br />
									</div>
								<p class="text-capitalize text-secondary d-md-none">Already have account!
								<button
										class="btn btn-link" type="button" id="toggle-4"
											onClick={()=>history.push("/")}>
											LOG IN
								</button>
								</p>
							</div>
						</div>
						</div>
						</div>
					</div>
				</div>) 
			:
			(history.push('/'))
			}
		</div>
	)	
}


export default SignUp
