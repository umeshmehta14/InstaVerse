import { createContext, useContext, useEffect, useReducer } from "react";
import { getAllUser, getSingleUser } from "./UserApi";
import { ALL_USERS } from "../../utils/Constants";
import { UserReducer } from "../../reducer/UserReducer/UserReducer";
import { UserInitialState } from "../../reducer/UserReducer/UserInitialState";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [userState, userDispatch] = useReducer(UserReducer, UserInitialState);


    const getUsers = async () =>{
        try {
            const {status, data: {users}} = await getAllUser();
            // const data = await getSingleUser();
            // console.log(data);
            if(status === 200 || status === 201){
                userDispatch({type: ALL_USERS, payload: users});
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
      getUsers();
    }, [])
    
    return <UserContext.Provider value={{userState, userDispatch}}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext);