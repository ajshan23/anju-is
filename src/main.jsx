import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginAndSignup from "./Pages/LoginAndSignup.jsx";
import Home from "./Pages/Home.jsx";
import Menu from "./Pages/Menu.jsx";
import Category from "./Pages/Category.jsx";
import Protected from "./components/Protected/Protected.jsx";
import Product from "./components/Product/Product.jsx";
import { foods, grocery, medicine } from "./features/productData.js";
import Cart from "./Pages/Cart.jsx";
import AddData from "./Pages/AddData.jsx";
import Restaurant from "./Pages/Restaurant.jsx";

const isAdmin = sessionStorage.getItem("admin")==="anju@gmail.com"

console.log(sessionStorage.getItem("admin"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<LoginAndSignup />} />
      <Route path="login" element={<LoginAndSignup />} />
      {!isAdmin &&<Route path="/" element={<Protected />}>
        {!isAdmin && <Route path="/" index element={<Home />} />}
        {!isAdmin && <Route path="/menu" element={<Menu />} />}
       {!isAdmin && <Route path="/cart" element={<Cart />} />}
       {!isAdmin && <Route path="/restaurant" element={<Restaurant />} >
          <Route path=":resname" element={<Restaurant/>} />
        </Route>}
       {!isAdmin && <Route path="/category" element={<Category/>}>
          <Route
            path=":categoryName"
            element={<Category  />}
          />
        </Route>}

        {!isAdmin&& <Route path="/product" element={<Product />}>
          <Route path=":categoryType/:productId" element={<Product />} />
        </Route>}
        <Route path="*" element={<h1>404</h1>} />
       
      </Route>}
      {isAdmin&& <Route path="/add" element={<AddData />} />}
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
