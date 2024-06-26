export type ProductType = {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    category:string;
    __v:number;
  };

  const URL = 'http://localhost:8000'
  
// Define a type for the cart item (adjust according to your API response structure)
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  userId: string; // Add userId to the cart item
}


export const fetchUserCartFromDatabase = async (userId: string): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${URL}/reactcart/${userId}`);
    if(response.status === 401){
      return []
    }
    if (!response.ok ) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("dfatatattaa",data)
    // Assuming data.cartItems is an array of ICartProduct from your backend
    const cartItems: CartItem[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      userId: userId,
    }));

    return cartItems;
  } catch (error) {
    console.error('Error fetching user cart:', error);
    throw new Error('Failed to fetch user cart data');
  }
};



  export const getAllProducts = async (): Promise<ProductType[]> => {
    try {
      const response = await fetch(`${URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: ProductType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // or handle error as needed (throw, return default data, etc.)
    }
  };

  export const getProductPages = async (page:string): Promise<ProductType[]> => {
    try {
      const response = await fetch(`${URL}/products/${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // or handle error as needed (throw, return default data, etc.)
    }
  };
  export const getProductById = async (id: string): Promise<ProductType> => {
    try {
      const response = await fetch(`${URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data: ProductType = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error; // Rethrow the error or handle as needed
    }
  };
  