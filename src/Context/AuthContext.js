// USER LOGIN OR NOT CHECKING GLOBALLY

import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [userAuth, setUserAuth] = useState({
        user:null,
        token:''
    })

    useEffect(() => {
        const data = localStorage.getItem('userAuth')
        if(data){
            const parseData = JSON.parse(data)
            setUserAuth({
                ...userAuth,
                user:parseData.user,
                token:parseData.token
            })
        }

    },[])
    return (
        <AuthContext.Provider value={[userAuth, setUserAuth]}>
            {children}
        </AuthContext.Provider>
    )

}


// Custom Hook

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}