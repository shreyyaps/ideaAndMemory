import { useEffect, useState } from "react";
import Card from "./Cards";
import "./CustomCss.css";
import Modal from "./CreateModal";
import { useUser } from "../StateManagement/UserContext";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DroppableZone from "./DroppableZone";
import DropModal from "./ui/DropModal";

const Body = () => {
  // states
  const [addCard, setAddCard] = useState([]);
  const [addMemoryCard, setAddMemoryCard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isIndex, setIsIndex] = useState();
  const { setUserData, defaultuserData } = useUser();
  const [activeCard, setActiveCard] = useState(null);
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);
  const [sharedTitle,setSharedTitle] = useState("");



  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8, 
    },
  });
  
  const sensors = useSensors(
    pointerSensor,
    useSensor(KeyboardSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  function handleDragStart(event) {
    const draggedId = event.active.id;
    const draggedItem = addCard.find((item) => item.id === draggedId);
    setActiveCard(draggedItem);

  }

  const handleDelete = (Index) => {
    setAddCard((prev) => prev.filter((_, inx) => inx !== Index));
  };

  const handleEditing = (card, idx) => {
    setIsModalOpen(true);
    setUserData(prev => ({
      ...prev,
      cardA: card
    }));
    setIsEditing(true);
    setIsIndex(idx);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setUserData(defaultuserData);
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && over.id === "target") {
      const draggedId = active.id;

        setAddCard((prev) => {
          const updated = prev.filter((item) => item.id !== draggedId)
          const found = prev.find((item)=>item.id===draggedId)
          if(found){
            setSharedTitle(found.title)
          }
         return updated;
        });

        setIsDropModalOpen(true);
      
    }
    setActiveCard(null);

  }

  useEffect(()=>{
    console.log(addMemoryCard);
  },[addMemoryCard])

  return (
    <>
      {isModalOpen && (
        <Modal
          onClose={() => handleClose()}
          onSubmit={(newCard) => {
            if (isEditing) {
              const UpdatedArray = [...addCard];
              UpdatedArray[isIndex] = newCard.createCard;
              setAddCard([...UpdatedArray]);
              setIsEditing(false);
            } else {
              const newCardWithId = { ...newCard.createCard, id: Date.now(),type:"create"};
              setAddCard([...addCard, newCardWithId]);
            }
            setIsModalOpen(false);
          }}
        />
      )}
      {isDropModalOpen&& (
        <DropModal
          onClose={() => setIsDropModalOpen(false)}
          onSubmit={(newCard) => {

            const newCardWithId = { ...newCard.memoryCard, id: Date.now(),title:sharedTitle,type:"memory" };
            setAddMemoryCard([...addMemoryCard, newCardWithId]);
           
            setIsDropModalOpen(false)
          }}
        />
      )}
      
      <div className="flex flex-col md:flex-row h-[89vh] gap-1 p-2 relative">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex content-start shadow-xl border border-white/20 rounded-xl bg-white/10 backdrop-blur-md w-full h-1/2 md:w-1/2 md:h-full p-2 flex-wrap grow overflow-auto">

            {addCard.map((cards, idx) => (
              <Card
                key={idx}
                card={cards}
                onDelete={() => {
                  handleDelete(idx)
                }}
                onEdit={() => handleEditing(cards, idx)}
              />
            ))}
            <div
              onClick={() => setIsModalOpen(true)}
              className="text-3xl w-[31.5vh] h-[40vh] m-2 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-all duration-200"
            >
              + Add Card
            </div>

          </div>

          <div className="flex scroll-smooth content-start shadow-xl border border-white/20 rounded-xl bg-white/10 backdrop-blur-md w-full h-1/2 md:w-1/2 md:h-full p-2 flex-wrap grow overflow-auto">
            <DroppableZone id="target">
              {addMemoryCard.map((cards, idx) => (
                <Card key={idx} card={cards} />
              ))}
            </DroppableZone>
          </div> 
          <DragOverlay zIndex={200}>
            {activeCard ? (
              <div className="opacity-80">
                <Card card={activeCard} isDragging={true} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default Body;