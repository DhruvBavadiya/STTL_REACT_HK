import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ProductType } from '../Service/product';

export const NewArrivalCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75">
        <img
          src={product.image}
          alt={product.name} // Alt attribute should have meaningful content (product name in this case)
          className="h-[30rem] sm:h-[24rem] w-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="text-lg text-white">
            <Link to={`/products/${product._id}`}> {/* Replace <a> with <Link> */}
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-lg font-medium text-white">${product.price}</p>
      </div>
    </div>
  );
};