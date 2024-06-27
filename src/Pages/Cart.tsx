import React from "react";
import CartCard from "../Component/CartCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../Store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(cartItems);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addItemsToDatabase = async (userId: string, items: CartItem[]) => {
    try {
      console.log(userId);
      await fetch(`http://localhost:8000/reactcart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: items }),
      });
    } catch (error) {
      console.error("Error adding items to database:", error);
    }
  };

  const handleCheckout = async (checkoutType: string) => {
    const localCart = JSON.parse(localStorage.getItem('cartState') || '{"items": []}');
    console.log(localCart);

    const userData = JSON.parse(localStorage.getItem('userData') ?? 'null');
    
    if (userData) {
      console.log(userData)
      await addItemsToDatabase(userData, localCart.items);
      console.log("Success");

      // Optional: Clear cart after successful submission
      // dispatch(clearCart());

      if (checkoutType === 'cash') {
        navigate('/cash-out');
      } else if (checkoutType === 'card') {
        navigate('/check-out');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          Shopping Cart
        </h2>
        <div className="hidden lg:grid grid-cols-2 py-6">
          <div className="font-normal text-xl leading-4 text-gray-500">
            Product
          </div>
          <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
            <span className="w-full max-w-[260px] text-center">Quantity</span>
            <span className="w-full max-w-[200px] text-center">Total</span>
          </p>
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartCard
              key={item.id}
              imageSrc={item.image} // Placeholder image, replace with actual image URLs if available
              productName={item.name}
              productDescription="Perfumes" // Adjust the description as necessary
              productPrice={item.price}
              quantity={item.quantity}
              _id={item.id}
            />
          ))
        ) : (
          <div>
            <p>Your cart is empty.</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
          <div className="flex items-center justify-between w-full py-6">
            <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
              Total
            </p>
            <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
              ${calculateTotal().toFixed(2)}
            </h6>
          </div>
        </div>

        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <button
            onClick={() => handleCheckout('cash')}
            className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
          >
            Checkout with Cash
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => handleCheckout('card')}
            className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
          >
            Checkout with Card
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
