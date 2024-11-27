import {  createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Product from "./Components/Product/Product";
import Regisiter from "./Components/Register/Regisiter";
import Login from "./Components/Login/Login";
import Forgatpassword from "./Components/Forgatpassword/Forgatpassword";
import ResetPassword from "./Components/Rsertpassword/Rsertpassword";
import Authtoken from "./Context/Authtoken";
import ProtectRouter from "./Components/ProtectRouter/ProtectRouter";
import Categories from "./Components/Categories/Categories";
import ProductDatils from "./Components/ProductDatils/ProductDatils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContextProvider";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import Allbrands from "./Components/Allbrands/Allbrands";

const queryClient = new QueryClient();
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectRouter>
            <Product />
          </ProtectRouter>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectRouter>
            <Product />
          </ProtectRouter>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectRouter>
            <Categories />
          </ProtectRouter>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectRouter>
             <Allbrands/>
          </ProtectRouter>
        ),
      },
      {
        path: "ProductDatils/:id",
        element: (
          <ProtectRouter>
            <ProductDatils />
          </ProtectRouter>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectRouter>
            <Payment />
          </ProtectRouter>
        ),
      },
      { path: "register", element: <Regisiter /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "Forgatpassword", element: <Forgatpassword /> },
      { path: "resertPassword", element: <ResetPassword /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Authtoken>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartContextProvider>
        </QueryClientProvider>
      </Authtoken>
    </>
  );
}
