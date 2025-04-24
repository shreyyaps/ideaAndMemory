import React from 'react';
import styled from 'styled-components';

const ImageGrid = ({pics}) => {

  return (
    <StyledWrapper>
      <div className="main">
        <img src={pics[0]} className="img-card" id="c1" />
        <img src={pics[1]} className="img-card" id="c2" />
        <img src={pics[2]} className="img-card" id="c3" />
      
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .img-card {
    width: 100%;
    height: 100%;
    background: rgba(211, 211, 211, 0.199);
    position: absolute;
    transition: .3s ease-in-out;
    cursor: pointer;
    box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.3);
    border-radius:0.75rem;
  }

  #c1 {
    background-color: black;
  }

  #c2 {
    background-color: blue;
  }

  #c3 {
    background-color: red;
  }

 

  .main:hover #c1 {
    transform: translateX(100px) rotate(40deg);
  }

  .main:hover #c2 {
    transform: translateX(50px) rotate(30deg);
  }

  .main:hover #c3 {
    transform: translateX(0) rotate(20deg);
  }

 

  #c1:hover {
    transform: translateX(150px) rotate(0deg) !important;
  }

  #c2:hover {
    transform: translateX(100px) rotate(0deg) !important;
  }

  #c3:hover {
    transform: translateX(50px) rotate(0deg) !important;
  }

 

  .main {
    display: grid;
    height: 100%;
    width: 100%;
    position: absolute;
    place-items: center;
    
  }`;

export default ImageGrid;
