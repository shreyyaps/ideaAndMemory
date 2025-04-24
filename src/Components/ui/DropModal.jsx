import { useUser } from "../../StateManagement/UserContext";
import ImagePicker from "../ImagePicker";
import TodoList from "../List";

const DropModal = ({ onClose, onSubmit }) => {


    const { userData, setUserData, defaultuserData } = useUser()


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userData);
        setUserData(defaultuserData)
    }
    const handleUpdate = (name, value) => {

        setUserData((prev) => ({
            ...prev,
            memoryCard: {
                ...prev.memoryCard,
                [name]: value,
            }
        }))

    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" >
            <div className=" h-[75vh] bg-black rounded-xl shadow-2xl w-[60vw] relative p-4 flex flex-col ">
                <button onClick={onClose} className="absolute top-2 right-2 text-white text-3xl">✕</button>
                <h1 className="text-2xl font-bold text-white mb-4" >Make your Memory ! </h1>
                <div className="flex gap-2 flex-1 overflow-hidden" >
                    <div className="flex flex-col flex-1 overflow-auto m-1 p-2">
                        <ImagePicker />
                        <div className="flex items-center gap-4 mb-4 m-2 w-[51vh]">
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
                        <div className=' w-[50vh] overflow-y-auto bg-white/10 text-white p-4 rounded-xl space-y-2 flex m-2 h-40'>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 overflow-auto m-1 p-2">
                        <div className="flex flex-col m-1 ">
                            <TodoList todos={userData.memoryCard.list} setTodos={(newTodos) => handleUpdate("list", newTodos)} title={"Must Do's"} height={"h-[15vh]"} />

                        </div>

                        <div className="flex flex-col w-[50vh] m-1">

                            <label className="text-xl mb-2 text-white font-bold">Summary</label>
                            <textarea
                                value={userData.memoryCard.summ}
                                onChange={(e) => {
                                    return setUserData({
                                        ...userData, memoryCard: {
                                            ...userData.memoryCard,
                                            summ: e.target.value,
                                        }
                                    })
                                }}
                                placeholder="Tell us your experience..."
                                className="p-2 rounded-xl bg-white/10 text-white placeholder:text-white/50 resize-none h-[28vh] w-[27vw]"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className=" bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 whitespace-nowrap w-[27vw] m-1 mt-3 "
                        >Create Memory</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DropModal;