import React from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addToCartAsync } from '../store/cartSlice';
import { useNavigate } from "react-router-dom";

const Card = ({dish}) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content flex justify-center flex-col items-center " >
              <img src="/Images/incir9023-scaled.jpg" alt="" />
              <strong className="text-[0.7rem]" >{dish.Product_Name}</strong>
            </div>
          </div>
          <div className="front">
            <div className="front-content">
              <small className="badge">{dish.Product_Rating +"⭐"}</small>
              <img src="/Images/incir9023-scaled.jpg" className="max-h-[50%]" alt="" />
              <div className="description">
                <div className="title">
                  <p className="title">
                    <strong className="text-[0.4rem]">{dish.Product_Name}</strong>
                  </p> <p className="card-footer"> | {dish.get_product_category.Product_Category}  </p>
                </div>
                <button onClick={()=>{
                  navigator('/dish/'+dish.Product_Name, { state: dish });
                }} className="text-white text-[0.8rem] p-0  m-0 max-w-[30px] bg-green-700 max-h-[20px]">View</button>
                <button onClick={() => dispatch(addToCartAsync({ ...dish, Attribute_Combination: dish.get_all_products[0].Attribute_Combination }))} className="ml-2 text-white text-[0.8rem] p-0 m-0 max-w-[60px] bg-orange-600 max-h-[20px] rounded">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    overflow: hidden;
    width: 190px; // Base width
    height: 254px;
    margin: 10px; // Added margin for spacing
    position: relative;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
  }

  .front,
  .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }

  .back {
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .back::before {
    position: absolute;
    content: " ";
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #ff9966, #ff9966, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  .front {
    transform: rotateY(180deg);
    color: white;
  }

  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .front-content .badge {
    background-color: #00000055;
    padding: 2px 10px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    width: fit-content;
  }

  .description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 10px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
  }

  .title {
    font-size: 11px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .title p {
    width: 50%;
  }

  .card-footer {
    color: #ffffff88;
    margin-top: 5px;
    font-size: 8px;
  }

  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ffbb66;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
  }

  #bottom {
    background-color: #ff8866;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
  }

  #right {
    background-color: #ff2233;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  // Media Queries for Responsiveness
  @media (max-width: 768px) {
    .card {
      width: 150px; // Adjust width for tablets
      height: 200px; // Adjust height for tablets
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 120px; // Adjust width for mobile
      height: 160px; // Adjust height for mobile
    }

    .front-content .badge {
      font-size: 10px; // Adjust badge font size for mobile
    }

    .title p {
      font-size: 10px; // Adjust title font size for mobile
    }

    .card-footer {
      font-size: 7px; // Adjust footer font size for mobile
    }
  }
`;

export default Card;
