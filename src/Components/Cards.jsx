import React from 'react';
import styled from 'styled-components';
import { People } from './People';
import { useDraggable } from '@dnd-kit/core';
import ImageGrid from './ui/ImageGrid';

const Card = ({ card, onDelete, onEdit }) => {



  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id
  });


  return (

    <StyledWrapper>
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <div className="card group relative" >
          <button
            onClick={onDelete}
            className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
          >
            x
          </button>
          <button
            onClick={onEdit}
            className="absolute top-6 right-8   bg-purple-600 px-4 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>

          <div className="h-[65%] rounded-xl p-3" >
            {card.type === "create" ? (card.location ? (<iframe
              src={card.location}
              title="Map Preview"
              className="w-full h-full rounded-xl border-none"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>) : (<div className='w-full h-full rounded-xl border-none'></div>)) : (
              <div className='className="w-full h-full rounded-xl border-none" relative'>

              <ImageGrid pics={card.pictures} />
              </div>
            )}
          </div>


          <div>

            <h1 className='text-white text-2xl p-1 pl-3 font-bold' >{card.title}</h1>

            <div className='flex mt-2 ' >
              <People />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 31.5vh;
    height: 40vh;
    border-radius: 1rem;
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    margin: 0.5rem;
  }`;

export default Card;
