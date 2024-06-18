import { createContext,useState } from "react";

 export const AuthContext = createContext();

export  function AuthContextProvider({children}){
    const [authDetails, setAuthDetails] = useState({
        isLoogedIn: true,
        token: null,
    });

    const login = (token) =>{
        setAuthDetails({
            isLoggedIn: true,
            token: token,
        })
        console.log(authDetails)
    }

    const logout = () =>{
        setAuthDetails({
            isLoggedIn: false,
            token: null,
        })
        console.log(authDetails)
    }



    return (
        <AuthContext.Provider value={{authDetails, login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}