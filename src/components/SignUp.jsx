import React , {useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from "./globals/axios"

function SignUp() {
    const history = useHistory()
	const [error , setError] = useState(null)
	const [status, setStatus] = useState(false)
    const [user , setUser] = useState({
        username : "",
        email : "",
        password : "",
        password2 : "",
    })
	const  handelClick = async()=>{
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
	console.log(error)
	console.log(status)
    return (
		<div>
			{
				!status ? 
				(<div className="centered">
				<div className="container">
			<div className="d-flex justify-content-center h-100">
				<div className="card">
					<div className="card-header">
						<h3>Sign Up</h3>
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
									setUser({...user , username : e.target.value})
								}}
								/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text"><i className="fas fa-user"></i></span>
								</div>
								<input type="email" className="form-control" placeholder="email" required
								value={user.email}
								onChange = {e => {
									setUser({...user , email : e.target.value})
								}}
								/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text"><i className="fas fa-key"></i></span>
								</div>
								<input type="password" className="form-control" placeholder="password" required
								value={user.password}
								onChange = {e => setUser({...user , password : e.target.value})}/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text"><i className="fas fa-key"></i></span>
								</div>
								<input type="password" className="form-control" placeholder="confirm password" required
								value={user.password2}
								onChange = {e => setUser({...user , password2 : e.target.value})}/>
							</div>
							{
							error ? 
							(
							<div>
								<br></br>
								<div class="alert alert-danger" role="alert">
									{
										Object.keys(error).map(key => 
											<div >{key} : {error[key]}</div>
										)
									}
								</div>
							</div>
							)
							:
							(<div></div>)
						}
							<div className="form-group">
								<input type="submit" value="Login" className="btn float-right btn-warning"
								onClick={()=>{
										handelClick()
								}}/>
							</div>
					</div>
					<div className="card-footer">
						<div className="d-flex justify-content-center links">
							Have an account?<button onClick={()=>history.push("/")}>Log In</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
			) 
			:
			(history.push('/'))
			}
		</div>
        )
}

export default SignUp
