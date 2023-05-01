import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const Navbar = () => {

    let [userAuth, setUserAuth] = useAuth()

    const handleLogout = (e) => {
        e.preventDefault();
        setUserAuth({
          ...userAuth,
          user: null,
        });
        localStorage.removeItem("userAuth");
        alert("Logged out successfully")
      }

    


  return (
    <div>
        <div className="nav-container">
            <div className="logo">
                <NavLink to='/'>CIS INFOTECH</NavLink>
            </div>

            <div className="menu">
                <ul>
                    {
                        userAuth?.user 
                        ?
                        (<>
                            <li onClick={(e) => handleLogout(e)} style={{cursor:'pointer'}}><NavLink to='/login'>Logout</NavLink></li>
                            <li className="name-logo">{userAuth?.user?.name.slice(0,1).toUpperCase()}</li>
                        </>)
                        :
                        (<>
                            <li><NavLink to='/login'>Login</NavLink></li>
                            <li><NavLink to='/register'>Register</NavLink></li>
                        </>) 
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}
export default Navbar