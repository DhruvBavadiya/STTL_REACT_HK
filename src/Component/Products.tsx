import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ProductCard } from './ProductCard';
import { ProductType, getAllProducts } from '../Service/product';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data: ProductType[] = await getAllProducts();
        setProducts(data);
        console.log(data); // Log the updated data, not 'products'
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.slice(0,8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 sm:py-6 lg:px-8 flex justify-center items-center mt-8">
          {/* Replace '#' with the actual route where you want to navigate */}
          <Link to="/all-products" className="text-white text-xl hover:text-gray-200">
            See More Products
          </Link>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2 text-white font-extrabold"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Products;
