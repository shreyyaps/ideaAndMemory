import { useDroppable } from "@dnd-kit/core";

const DroppableZone = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef} 
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        
        transition: 'background-color 0.3s ease'
      }}
    >
      {children}
    </div>
  );
};

export default DroppableZone;