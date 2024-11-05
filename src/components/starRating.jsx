import React from "react";
import styled from "styled-components";

const StarInput = () => {
  return (
    <StyledWrapper>
      <div className="rating">
        <input value="5" name="rating" id="star5" type="radio" />
        <label htmlFor="star5" />
        <input value="4" name="rating" id="star4" type="radio" />
        <label htmlFor="star4" />
        <input value="3" name="rating" id="star3" type="radio" />
        <label htmlFor="star3" />
        <input value="2" name="rating" id="star2" type="radio" />
        <label htmlFor="star2" />
        <input value="1" name="rating" id="star1" type="radio" />
        <label htmlFor="star1" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .rating {
  display: inline-block;
}

.rating input {
  display: none;
}

.rating label {
  float: right;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}

.rating label:before {
  content: '\2605';
  font-size: 30px;
}

.rating input:checked ~ label,
.rating label:hover,
.rating label:hover ~ label {
  color: #6f00ff;
  transition: color 0.3s;
}

`;

export default StarInput;
