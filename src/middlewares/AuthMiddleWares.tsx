import { ReactNode } from "react"
import { Navigate } from "react-router"
import { userAuth } from "src/utils/auth"


type Props = {
    children: ReactNode
}

export const AuthMiddleWare = ({children}: Props) => {
   

    const {isLogged} = userAuth();

    if(!isLogged) {
       return (
        <Navigate to="/signin" replace/>
       )
    }

    

    return (
        <>
         {children}
        </>
    )
}