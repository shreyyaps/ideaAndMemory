import { useState } from "react";
import { useUser } from "../StateManagement/UserContext";

const Location = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userPaste, setUserPaste] = useState("");
    const { userData, setUserData } = useUser()

    const convertUrl = (url) => {
        try {
            const match = url.match(/@([-0-9.]+),([-0-9.]+)/);
            if (match) {
                const lat = match[1];
                const lng = match[2];
                return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
            }
        } catch {
            return "";
        }
        return "";
    }

    const handleSubmit = () => {
        const embed = convertUrl(userPaste);
        if (embed) {
            setUserData({
                ...userData,
                createCard: {
                    ...userData.createCard,
                    location: embed,
                },
            })

        } else {
            alert("Please paste a valid Google Maps link.");
        }
        setIsModalOpen(false);
    }

    return (
        <div>
            {isModalOpen && <div>
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-100" >
                    <div className=" h-[20vh] bg-black rounded-xl shadow-2xl w-[20vw] relative p-4 flex flex-col ">
                        <button onClick={handleSubmit} className="absolute top-2 right-2 text-white text-3xl">✕</button>
                        <div>
                            <h1 className="text-2xl font-bold mb-1" >Paste your Map Location...</h1>
                            <textarea
                                value={userPaste}
                                onChange={(e) => setUserPaste(e.target.value)}
                                placeholder="paste here.."
                                className="p-2 rounded bg-white/10 text-white placeholder:text-white/50 resize-none h-full w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>}
            {userData.createCard.location ? (<div className="w-[50vh] h-[28vh] relative">
                <button onClick={() => setUserData({
                    ...userData,
                    createCard: {
                        ...userData.createCard,
                        location: "",
                    },
                })} className="absolute top-2 right-2 text-black text-3xl">✕</button>
               
                <iframe
                    src={userData.createCard.location}
                    title="Map Preview"
                    className="w-full h-full rounded-xl border-none"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>) : (<div
                onClick={() => setIsModalOpen(true)}
                className=" text-3xl w-[50vh] h-[28vh] m-2 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-all duration-200"
            >
                + Add Location
            </div>)}
        </div>

    )
}

export default Location;