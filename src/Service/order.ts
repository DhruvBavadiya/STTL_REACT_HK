import { error } from "console";
import { URL } from "./product";

export type getorder = {
  _id: string;
  user_id: string;
  cart_id: string;
  total: string;
  date: Date;
  method: string;
};

export type apiresponse = {
  items: getorder[];
};


export type addItem = {
    user_id:string,
    total:number;
    method:string
}

const getOrderByUser = async (user_id: string): Promise<getorder[]> => {
  try {
    if (!user_id) {
      throw new Error("please provide user_id");
    }
    let order = [];

    const res = await fetch(`${URL}/order/${JSON.parse(user_id)}`);
    order = await res.json();
    console.log(order)
    return order;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

const addOrder = async(data:addItem):Promise<boolean> =>{
    try {

        data.user_id = JSON.parse(data.user_id)
        const res = await fetch(`${URL}/order`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify(data)
        })

        if(res.ok){
            return true
        }
        return false
    } catch (error) {
        console.error("Error fetching orders:", error);
        return false
    }
}

export {addOrder,getOrderByUser}