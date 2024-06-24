// CartCard.tsx

import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { decreaseItem, increaseItem } from '../Store/cartSlice';
import { AuthContext } from '../Context/authContext';

interface CartCardProps {
  imageSrc: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  quantity: number;
  _id: string;
}

const CartCard: React.FC<CartCardProps> = ({
  imageSrc,
  productName,
  productDescription,
  productPrice,
  quantity,
  _id,
}) => {
    const { isLoggedIn, setIsLoggedIn,cartLength,setCartlength } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleDecrease = () => {
    dispatch(decreaseItem(_id));
    setCartlength(JSON.parse(localStorage.getItem('cartState')||'')?.length)

  };
  const handleIncrease = ()=>{
    dispatch(increaseItem(_id))
    setCartlength(JSON.parse(localStorage.getItem('cartState')||'')?.length)

  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div className="img-box">
          <img src={imageSrc} alt={productName} className="xl:w-[140px] rounded-xl object-cover" />
        </div>
        <div className="pro-data w-full max-w-sm">
          <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
            {productName}
          </h5>
          <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
            {productDescription}
          </p>
          <h6 className="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center">
            ${productPrice.toFixed(2)}
          </h6>
        </div>
      </div>
      <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        <div className="flex items-center w-full mx-auto justify-center">
          <button
            onClick={handleDecrease}
            className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            type="text"
            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
            placeholder={quantity.toString()}
            readOnly
          />
          <button onClick={handleIncrease} className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeOpacity="0.2"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          ${(productPrice * quantity).toFixed(2)}
        </h6>
      </div>
    </div>
  );
};

export default CartCard;
