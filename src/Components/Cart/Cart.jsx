import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    allProdects,
    numOfCartItems,
    totalCartPrice,
    deleteCart,
    updataApi,
    clearCart,
  } = useContext(CartContext);
  const cartNavigate = useNavigate();
  async function handleDelete(id) {
    const message = await deleteCart(id);
    if (message) {
      toast.success("Product deleted", {
        duration: 2000,
        position: "top-right",
        style: { backgroundColor: "#2563eb", color: "white" },
      });
    } else {
      toast.error("Something went wrong", {
        duration: 2000,
        position: "top-right",
      });
    }
  }
  async function handleUpdate(id, counter) {
    const message = await updataApi(id, counter);
    if (message) {
      toast.success("Product updated", {
        duration: 2000,
        position: "top-right",
        style: { backgroundColor: "#2563eb", color: "white" },
      });
    } else {
      toast.error("Something went wrong", {
        duration: 2000,
        position: "top-right",
      });
    }
  }
  async function handleClearCart() {
    const message = await clearCart();
    if (message) {
      toast.success("Cart cleared", {
        duration: 2000,
        position: "top-right",
        style: { backgroundColor: "#2563eb", color: "white" },
      });
      setTimeout(() => {
        cartNavigate("/product");
      }, 500);
    } else {
      toast.error("Something went wrong", {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Cart Items: {numOfCartItems}
        </h2>
        <h2 className="text-xl sm:text-2xl font-bold">
          Total Price: {totalCartPrice} LE
        </h2>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Clear Cart
        </button>
        <Link to='/payment'>
        <button className="px-4 py-2  bg-blue-600 text-white rounded-lg  my-4">
          Payment Now
        </button>
        </Link>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="hidden sm:table-header-group bg-gray-100 text-gray-600">
          <tr>
            <th scope="col" className="px-4 py-2">
              Image
            </th>
            <th scope="col" className="px-4 py-2">
              Product
            </th>
            <th scope="col" className="px-4 py-2">
              Quantity
            </th>
            <th scope="col" className="px-4 py-2">
              Price
            </th>
            <th scope="col" className="px-4 py-2">
              Action
            </th>
          </tr>
        </thead>
        {allProdects?.map((product) => (
          <tbody key={product._id} className="border-b">
            <tr className="flex flex-col sm:table-row bg-white">
              <td className="p-2 flex justify-center sm:table-cell">
                <img
                  src={product.product.imageCover}
                  className="w-20 md:w-32"
                  alt={product.product.title}
                />
              </td>
              <td className="px-4 py-2 sm:table-cell text-gray-800 font-medium">
                {product.product.title.split(" ").slice(0, 3).join(" ")}
              </td>
              <td className="px-4 py-2 sm:table-cell flex items-center justify-center space-x-2">
                <button
                  disabled={product.count === 1}
                  onClick={() =>
                    handleUpdate(product.product._id, product.count - 1)
                  }
                  className="text-gray-500 bg-gray-100 rounded-full p-1"
                >
                  -
                </button>
                <input
                  type="text"
                  value={product.count}
                  readOnly
                  className="text-center w-10 border rounded-md"
                />
                <button
                  onClick={() =>
                    handleUpdate(product.product._id, product.count + 1)
                  }
                  className="text-gray-500 bg-gray-100 rounded-full p-1"
                >
                  +
                </button>
              </td>
              <td className="px-4 py-2 sm:table-cell text-gray-800 font-medium">
                ${product.price}
              </td>
              <td className="px-4 py-2 sm:table-cell">
                <button
                  onClick={() => handleDelete(product.product._id)}
                  className="text-red-600 font-medium hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
