import { useEffect, useState } from "react";
import { ProductType, getAllProducts } from "../Service/product";
import { Link } from "react-router-dom";
import { ProductCard } from "../Component/ProductCard";

const ProductListing = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ProductType[] = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <hr className="flex-1 border-gray-300" />
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 mx-6">
            Our Products
          </h2>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-10 mt-10">
          {products.map((product) => (
           <ProductCard key={product._id} product = {product}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
