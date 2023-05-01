import { Outlet } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import Homepage from "../Pages/Homepage"

const PrivateRoute = () => {

    const [userAuth, setUserAuth] = useAuth()

  return (
    
    userAuth?.user ? <Outlet/> : <Homepage/>
    
  )
}
export default PrivateRoute