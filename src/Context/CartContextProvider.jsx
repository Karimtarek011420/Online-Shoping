import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [allProdects, setallProdects] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [cartId, setcartId] = useState(null);
  const [message, setmessage] = useState(null);
  async function apiCart(productid) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productid,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((x) => {
        getUserCart();
        setmessage(x.data.message);
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((x) => {
        console.log(x.data);
        setallProdects(x.data.data.products);
        settotalCartPrice(x.data.data.totalCartPrice);
        setnumOfCartItems(x.data.numOfCartItems);
        setcartId(x.data.cartId);
      })
      .catch((x) => {
        console.log("error", x);
      });
  }
  useEffect(() => {
    getUserCart();
  }, []);
  async function deleteCart(productid) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((x) => {
        setallProdects(x.data.data.products);
        settotalCartPrice(x.data.data.totalCartPrice);
        setnumOfCartItems(x.data.numOfCartItems);
        return true;
      })
      .catch((x) => {
        console.log(x);
        return false;
      });
  }
  async function updataApi(productid, countNumber) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        {
          count: countNumber,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((x) => {
        setallProdects(x.data.data.products);
        settotalCartPrice(x.data.data.totalCartPrice);
        setnumOfCartItems(x.data.numOfCartItems);
        return true;
      })
      .catch((x) => {
        console.log(x);
        return false;
      });
  }
  async function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then(() => {
        setallProdects(null);
        settotalCartPrice(0);
        setnumOfCartItems(0);
        return true;
      })
      .catch((x) => {
        console.log(x);
        return false;
      });
  }
  function cartPayment() {
    setallProdects(null);
    settotalCartPrice(0);
    setnumOfCartItems(0);
  }

  return (
    <CartContext.Provider
      value={{
        allProdects,
        numOfCartItems,
        totalCartPrice,
        message,
        apiCart,
        getUserCart,
        deleteCart,
        updataApi,
        clearCart,
        cartId,
        cartPayment
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
