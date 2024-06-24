import React, { useEffect, useState } from 'react';
import Promotion from '../Component/Promotion';
import NewArrival from '../Component/NewArrival';
import Products from '../Component/Products';
import Cashout from './Cashout';
import Ads from './Ads';
import { ProductType, getAllProducts } from '../Service/product';



export const Landing = () => {

  return (
    <div className='bg-gradient-to-r from-gray-400 via-blue-500'>
      <Promotion />
      <div className='flex justify-center'>
        <Ads />
      </div>
      <NewArrival />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-4 flex justify-center items-center">
        <hr className="flex-1 border-gray-300" />
        <h2 className="text-3xl font-bold tracking-tight text-center text-white mx-6">Our Products</h2>
        <hr className="flex-1 border-gray-300" />
      </div>
      <Products />
    </div>
  );
};

export default Landing;
