interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    userId: string | null; // Updated to explicitly include null for logged-out state
  }
  
  export const mergeCartData = (localCart: CartItem[], fetchedCart: CartItem[]): CartItem[] => {
    const cartMap = new Map<string, CartItem>();
    console.log(localCart , fetchedCart)
    // Add local cart items to the map
    localCart.forEach(item => {
      cartMap.set(item.id, item);
    });
  
    // Add fetched cart items to the map, updating quantities if necessary
    fetchedCart.forEach(item => {
      // Prioritize localCart over fetchedCart
      if (!cartMap.has(item.id)) {
        cartMap.set(item.id, item);
      } else {
        const existingItem = cartMap.get(item.id);
        if (existingItem) {
          // Update quantity if item already exists in localCart
          existingItem.quantity = item.quantity;
        }
      }
    });
  console.log("here" , Array.from(cartMap.values()))
    // Convert map back to an array
    return Array.from(cartMap.values());
  };
  