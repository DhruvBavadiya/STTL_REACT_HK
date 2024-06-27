import React, { useContext, useEffect, useState } from 'react';
import { ProductType } from '../Service/product';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../Store/cartSlice';
import { AuthContext } from '../Context/authContext';
import NewArrival from './NewArrival';
import { getProductById } from '../Service/product'; // Assuming you have a function to get a product by ID

export const Details = () => {
  const { isLoggedIn, setIsLoggedIn, cartLength, setCartlength } = useContext(AuthContext);
  const [product, setProduct] = useState<ProductType | null>(null);
  const { _id } = useParams();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      const { _id, name, price, image } = product;
      const quantity = 1;
      const userId = localStorage.getItem('userData') || null;
      dispatch(addItem({ id: _id, name, price, quantity, image, userId }));
      setCartlength(JSON.parse(localStorage.getItem('cartState') || '[]').length);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (_id) {
          const fetchedProduct = await getProductById(_id);
          console.log(fetchedProduct)
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col'>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.image}
              srcSet={`${product.image} 400w, ${product.image} 800w, ${product.image} 1200w, ${product.image} 1600w`}
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                HARMON KARDON
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <p className="leading-relaxed">
                {product.description}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, nobis hic cupiditate sed repudiandae, laborum ab tenetur magni eveniet, temporibus qui ut ducimus maiores numquam. Facere, fugiat? Voluptate, porro eum.
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex ml-6 items-center">
                  <div className="relative"></div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add To Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
