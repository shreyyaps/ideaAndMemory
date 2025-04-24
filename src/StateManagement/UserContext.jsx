import { createContext,useContext,useState } from "react";



const UserContext = createContext();


const defaultuserData = {
    createCard:{
        title: "",
        desc: "",
        location: "",
        list: [],
    },
    memoryCard:{
      pictures: [],
      list: [],
      summ: "",
      title:"",
    },
}

export const UserProvider = ({children}) =>{
 const [userData, setUserData] = useState(defaultuserData);

     return (
        <UserContext.Provider value={{userData,setUserData, defaultuserData}} >
            {children}
        </UserContext.Provider>
     );
}

export const useUser = () => useContext(UserContext);