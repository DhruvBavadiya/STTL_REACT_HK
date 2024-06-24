import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PromotionCard from "./PromotionCard"; // Assuming this is the file path where PromotionCard component is defined
import { ProductType, getAllProducts } from "../Service/product";

const Promotion = () => {
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
    <div className="relative overflow-hidden ">
      <div className="pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:max-w-lg mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Discover Our New Collection
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Elevate your style with our latest arrivals crafted to bring
              comfort and elegance to your everyday.
            </p>
            {/* Replace '#' with the actual route where you want to navigate */}
            <Link
              to="/all-products "
              className="mt-6 inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products?.slice(0, 3).map((product) => (
                <PromotionCard
                  key={product._id}
                  imageUrl={product.image}
                  title={product.name}
                  description={product.description} id={product._id}                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
