import { useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"

const Update = () => {
    const [userAuth] = useAuth()
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState(userAuth.user.email)
    const [password, setPassword] = useState('')
    const [name, setName] = useState(userAuth.user.name)  
    const navigate = useNavigate()
    const params = useParams()

    const showPassword = () => {
        setShowPass(!showPass)
        
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log(name)

        let passVer = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

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
    
        try {
            let resp = await fetch(`http://localhost:3500/update/${params.id}`, {method:"PATCH",
            body:JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}

        })
        let data = await resp.json()

        if (data.success) {
            localStorage.setItem("userAuth", JSON.stringify(data))
            alert(data.message);
            navigate('/')
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
                <h1>Update</h1>
                <hr />

                <div className="input-field">
                    <div className="input-div">
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Update Name</label>
                    </div>

                    <div className="input-div">
                        <input readOnly type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Update Email</label>
                    </div>

                    <div className="input-div">
                        <input type={showPass ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">Update Password</label>
                        <i className={!showPass ? "fa fa-eye eye" : "fa-solid fa-eye-slash eye"} onClick={showPassword} ></i>
                    </div>
                    <p className="password-info" style={{color:"green", fontSize:"14px"}}>* If you don not want to update password, please enter previous password.</p>
                </div>
                <button onClick={(e) => handleUpdate(e)}>Update</button>
            </div>
        </div>
    </div>
  )
}
export default Update