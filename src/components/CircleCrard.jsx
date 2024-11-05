import React from "react";
import styled from "styled-components";

const CircleCard = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  height: 96px;
  width: 96px;
  animation: rotate_3922 1.2s linear infinite;
  background-color: #CB0000;
  background-image: linear-gradient(#CB0000, #FFC700, #c79c00);
}

.container span {
  position: absolute;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  background-color: #cb0000;
  background-image: linear-gradient(#ff0000, #ffc800, #ffc800);
}

.container span:nth-of-type(1) {
  filter: blur(5px);
}

.container span:nth-of-type(2) {
  filter: blur(10px);
}

.container span:nth-of-type(3) {
  filter: blur(25px);
}

.container span:nth-of-type(4) {
  filter: blur(50px);
}

.container::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background-color: #fff;
  border: solid 5px #ffffff;
  border-radius: 50%;
}

@keyframes rotate_3922 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
`;

export default CircleCard;
