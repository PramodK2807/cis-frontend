import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const showPassword = () => {
        setShowPass(!showPass)
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        // we can use axios library also for API Call

        if(!email){
            alert('Please enter a valid email')
            return false
        }
        
        if(!password || password.length < 8 ){
            alert('Password must be at least 8 characters')
            return false
        }

        try {
            let result = await fetch('http://localhost:3500/login',{method:"POST",
            body: JSON.stringify({email, password}),
            headers: { "Content-Type": "application/json" },
          })

          let userData = await result.json();
          if(userData.success){
              alert(userData.message)
              navigate('/')
              localStorage.setItem("userAuth", JSON.stringify(userData))
          }
          else{
            alert(userData.message)
          }

        } 
        catch (error) {
            alert("Something wrong")
        }
    }


  return (
    <div>
        <div className="container">
            <div className="input-container">
                <h1>Login</h1>
                <hr />
                <div className="input-field">

                    <div className="input-div">
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-div">
                        <input type={showPass ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <i className={!showPass ? "fa fa-eye eye" : "fa-solid fa-eye-slash eye"} onClick={showPassword} ></i>
                    </div>
                    <p className="password-info">* Password must contains atleast 1 numeric, 1 Uppercase & 1 Special char</p>
                </div>
                <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
            </div>
        </div>
    </div>
  )
}
export default Login