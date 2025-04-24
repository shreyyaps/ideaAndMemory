import TodoList from "./List";
import Location from "./Location";
import { useUser } from "../StateManagement/UserContext";

const Modal = ({ onClose, onSubmit, }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        onSubmit(userData);
        setUserData(defaultuserData)
    }
  const {userData,setUserData, defaultuserData} = useUser()


    const handleUpdate = (name, value) =>{
        
        setUserData((prev)=>({...prev,
            createCard:{
                    ...prev.createCard,
                    [name]:value}
            }
            ))
    }
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" >
            <div className=" h-[75vh] bg-black rounded-xl shadow-2xl w-[60vw] relative p-4 flex flex-col ">
                <button onClick={onClose} className="absolute top-2 right-2 text-white text-3xl">✕</button>

                <h1 className="text-2xl font-bold text-white mb-4" >Create your idea!</h1>
                <div className="flex gap-2 flex-1 overflow-hidden" >
                    <div className="flex flex-col flex-1 overflow-auto m-1  p-2">
                       <Location/>
                        <div className="flex w-[50vh] m-1 mt-2" >

                            <p className="text-xl mr-2 mt-1" >Title</p>
                            <input
                                value={userData.createCard.title}
                                onChange={(e) => {
                                    return setUserData({...userData,
                                    createCard: {
                                      ...userData.createCard,  title:e.target.value
                                    }
                                    })
                                }}
                                placeholder="Ex-raging party with chloe "
                                className="p-2 rounded bg-white/10 text-white placeholder:text-white/50 w-full "
                            />
                        </div>
                        <div className="flex flex-col w-[50vh] m-1">

                            <label className="text-xl mb-2 text-white">Description</label>
                            <textarea
                             value={userData.createCard.desc}
                                onChange={(e) => {
                                    return setUserData({...userData,
                                    createCard: {
                                      ...userData.createCard,  desc:e.target.value
                                    }
                                    })
                                }}
                                placeholder="Describe your idea in detail..."
                                className="p-2 rounded bg-white/10 text-white placeholder:text-white/50 resize-none h-[28vh]"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col flex-1 overflow-auto m-1  " >
                        <div className="flex flex-col m-1 ">
                            <TodoList todos = {userData.createCard.list} setTodos = {(newTodos)=>handleUpdate("list",newTodos)} title={"Make your LIst"} height={"h-[25vh]"} />

                        </div>
                        <div className="flex items-center gap-4 mb-4 m-2 ">
                        <label className="text-xl mb-2 mt-2  text-white">Add people:</label>
                        <input


                            placeholder="search people online?"
                            className="flex-1 p-2 rounded bg-white/20 placeholder:text-white/40 text-white"
                        />
                        <button

                            className=" bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 whitespace-nowrap mr-3.5 "
                        >
                            🔍
                        </button>

                        </div>

                        <button onClick={handleSubmit}
                        className=" bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 whitespace-nowrap  mt-30"
                          >Create Idea</button>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Modal;