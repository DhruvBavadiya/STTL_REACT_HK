import React, { useEffect, useState } from 'react';
import { NewArrivalCard } from './NewArrivalCard';
import { ProductType, getAllProducts } from '../Service/product';

const NewArrival = () => {
  const [products, setproducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const data: ProductType[] = await getAllProducts();
      setproducts(data);
    };
    getProducts();
  }, []);
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex justify-center items-center mb-10">
          <hr className="flex-1 border-gray-300" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center text-Black">New Arrival</h2>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-16">
        {products.slice(0,4).map((product) => (
            <NewArrivalCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
