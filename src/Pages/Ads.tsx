import React, { useEffect, useState } from "react";
import { ProductType, getAllProducts } from "../Service/product";
import { useNavigate } from "react-router-dom";

const Ads = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    const getAll = async () => {
      const data: ProductType[] = await getAllProducts();
      let addtoproducts: ProductType[] = [];
      data.forEach((item) => {
        if (item.name.startsWith("HAK")) {
          addtoproducts.push(item);
        }
      });
      setProducts(addtoproducts);
    };
    getAll();
  }, []);

  const handleClick = (image: string) => {
    products.forEach(element => {
      if(element.image===image){
        navigate(`/products/${element._id}`)
      }
    });
    // navigate(`/products/${product._id}`)
    // Here you can perform any action with the clicked image URL
    // For example, open a modal, navigate to a product page, etc.
  };

  return (
    <section className="text-gray-600 body-font w-3/4">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            <span className="font-bold" style={{ fontFamily: 'Georgia, serif' }}>HARMON KARDON</span> Products - Headphone Brands
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Harmon Kardon offers a diverse range of high-quality headphones,
            catering to every audio enthusiast. Whether you prefer over-ear,
            on-ear, or true wireless earbuds, our products deliver exceptional
            sound quality and comfort. Explore our headphone brands to find the
            perfect match for your listening experience.
          </p>
        </div>

        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img
                onClick={() => handleClick("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt="gallery"
                className="w-full rounded-lg object-cover h-full object-center block cursor-pointer"
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                onClick={() => handleClick( "https://plus.unsplash.com/premium_photo-1680346528789-0ffcc13f5ebf?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt="gallery"
                className="w-full rounded-lg object-cover h-full object-center block cursor-pointer"
                src={ "https://plus.unsplash.com/premium_photo-1680346528789-0ffcc13f5ebf?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img
                onClick={() => handleClick( "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")}
                alt="gallery"
                className="w-full rounded-lg h-full object-cover object-center block cursor-pointer"
                src={ "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                onClick={() => handleClick("https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2868&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt="gallery"
                className="w-full rounded-lg h-full object-cover object-center block cursor-pointer"
                src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2868&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                onClick={() => handleClick( "https://plus.unsplash.com/premium_photo-1679695191609-7c85b5939493?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt="gallery"
                className="w-full rounded-lg object-cover h-full object-center block cursor-pointer"
                src={ "https://plus.unsplash.com/premium_photo-1679695191609-7c85b5939493?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                onClick={() => handleClick( "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")}
                alt="gallery"
                className="w-full rounded-lg object-cover h-full object-center block cursor-pointer"
                src={"https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ads;
