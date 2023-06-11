import { createContext, useContext, useEffect } from "react";
import { getAllUser, getSingleUser } from "./UserApi";
import { ALL_USERS } from "../../utils/Constants";
import { usePost } from "../index";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const { dispatch } = usePost();

    const getUsers = async () =>{
        try {
            const {status, data: {users}} = await getAllUser();
            if(status === 200 || status === 201){
                dispatch({type: ALL_USERS, payload: users});
            }
        } catch (err) {
            console.error(err)
        }
    }


    useEffect(() => {
      getUsers();
    }, [])
    
    return <UserContext.Provider value={{}}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext);