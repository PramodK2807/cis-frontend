import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const Homepage = () => {

    let [userAuth, setUserAuth] = useAuth()

    
    const getUserAuth = () => {
        let data =  localStorage.getItem("userAuth")
        if(data){
            const parseData = JSON.parse(data)
            setUserAuth({
                ...userAuth,
                user:parseData.user,
                token:parseData.token
            })
        }
    }
    useEffect(() => {
        getUserAuth()
    },[])
    
  return (
    <div>
        <div className="home-container">
            <h1 style={{textAlign:'center', margin:'20px 0 0 0 '}}>Welcome {userAuth?.user?.name} to the CIS Infotech</h1>
            <div className="home-box">
                <div className="user-image">
                    <img style={{width:"100%"}} src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' alt="User-icon" />
                </div>
                <p className="user-name">
                    <span>Name : </span>
                {userAuth?.user?.name ? userAuth.user.name : "Go to Login"}
                </p>
                <p className="user-email">
                    <span>Email : </span>
                {userAuth?.user?.email ? userAuth.user.email : "Go to Login"}
                </p>

                {
                    userAuth?.user 
                    ? (<><NavLink style={{textDecoration:"none", color:'white'}} to={`/profile/update/${userAuth.user._id}`} ><button>Update Profile</button></NavLink></>)
                    :
                    (<><NavLink style={{textDecoration:"none", color:'white'}} to='/login' ><button>Login</button></NavLink></>)
                }


                
            </div>
        </div>
    </div>
  )
}
export default Homepage