import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ProductType,
  getAllProducts,
  getProductById,
} from "../Service/product";
import { Details } from "../Component/Details";

export const Specific = () => {
  let { _id } = useParams<{ _id: string }>(); // Ensure _id is of type string
  const [product, setProduct] = useState<ProductType>(); // Initialize product state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: ProductType = await getProductById(_id ? _id : "");
        setProduct(data); // Update product state with fetched data
        // console.log(data); // Log fetched product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (_id) {
      fetchProduct(); // Call fetchProduct only if _id exists
    }
  }, [_id]); // Add _id to the dependency array to re-fetch product when _id changes

  const dummy = {
        "_id": "6676600a05778a4e1a0d848e",
        "name": "HK-99988",
        "price": 19.99,
        "description": "This is Harman Cardon Special.",
        "category": "Electronics",
        "image": "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "quantity": 100,
        "__v": 0
  }
  return (
    <Details product={product?product:dummy}/>
  );
};
