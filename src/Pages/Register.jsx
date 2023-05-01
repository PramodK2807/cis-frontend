import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    // const [error, setError] = useState(false)
    const navigate = useNavigate()

    const showPassword = () => {
        setShowPass(!showPass)
        
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log(name)

        let passVer = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        let emailVer = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

        if(!name){
            alert('Please enter your name')
            return false
        }

        if(!email){
            alert('Please enter a valid email')
            return false
        }
        
        if(!password || password.length < 8 ){
            alert('Password must be at least 8 characters')
            return false
        }

        if( !password.match(passVer)){
            alert('Please enter valid password')
            return true
        }

        if(!email.match(emailVer)){
            alert('Please enter valid email')
            return true
        }
    
        try {
            let resp = await fetch(`${process.env.REACT_APP_API}/register`, {method:"POST",
            body:JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}

        })
        let data = await resp.json()

        if (data.success) {
            alert(data.message);
            navigate('/login')
          }
          else{
            alert(data.message);
          }
        } 
        catch (error) {
          alert("Something went wrong")
        }

    }
  return (
    <div>
        <div className="container">
            <div className="input-container">
                <h1>Registration Form</h1>
                <hr />
                <div className="input-field">
                    <div className="input-div">
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="input-div">
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-div">
                        <input type={showPass ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <i className={!showPass ? "fa fa-eye eye" : "fa-solid fa-eye-slash eye"} onClick={showPassword} ></i>
                    </div>
                
                </div>
                <p className="password-info">* Password must contains atleast 1 numeric, 1 Uppercase & 1 Special char</p>
                <button onClick={(e) => handleRegister(e)}>Submit</button>
            </div>
        </div>
    </div>
  )
}
export default Register