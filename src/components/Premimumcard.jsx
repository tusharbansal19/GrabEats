import React from "react";
import styled from "styled-components";

const PremiminCard = ({dish}) => {
  return (
    <StyledWrapper>
      <div className="container max-w-[20vw] min-w-[150px] max-h-[55vw] my-6 rounded-3xl">
        <div className="card_box">
          <span />
          <div className="front-content px-2" onClick={()=>{
            // console.log("ocdeowbhfchbsbvbsv")
            navigator('/dish/'+dish.Product_Name, { state: dish });
          }}>
              <small className="badge mt-7 lg:mt-0">{dish.Product_Rating +"⭐"}</small>
              <img src="./public/Images/incir9023-scaled.jpg" className="max-h-[50%]" alt="" />
              <div className="description">
                <div className="title pl-4">
                  <p className="title">
                    <strong className="text-[0.4rem] text-orange-400 inline">{dish.Product_Name}<p className="card-footer text-[0.5rem] text-green-300 inline"> | {dish.get_product_category.Product_Category}  </p></strong>
                  </p> 
                </div>
                <button onClick={()=>{
                  // console.log("ocdeowbhfchbsbvbsv")
                  navigator('/dish/'+dish.Product_Name, { state: dish });
                }} className="text-white text-[0.8rem] p-0  ml-2 max-w-[30px] bg-green-700 max-h-[20px]">BUY</button>
               
              </div>
            </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_box {
  width: 200px;
  height: 250px;
  border-radius: 20px;
  background: linear-gradient(170deg, rgba(58, 56, 56, 0.623) 0%, rgb(31, 31, 31) 100%);
  position: relative;
  box-shadow: 0 25px 50px rgba(0,0,0,0.55);
  cursor: pointer;
  transition: all .3s;
}

.card_box:hover {
  transform: scale(0.9);
}

.card_box span {
  position: absolute;
  overflow: hidden;
  width: 150px;
  height: 150px;
  top: -10px;
  left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_box span::before {
  content: 'Premium';
  position: absolute;
  width: 150%;
  height: 40px;
  background-image: linear-gradient(45deg, #ff6547 0%, #ffb144  51%, #ff7053  100%);
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 5px 10px rgba(0,0,0,0.23);
}

.card_box span::after {
  content: '';
  position: absolute;
  width: 10px;
  bottom: 0;
  left: 0;
  height: 10px;
  z-index: -1;
  box-shadow: 140px -140px #cc3f47;
  background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%);
}
`;

export default PremiminCard;
