import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import {Route,RouterProvider, createBrowserRouter, createRoutesFromElements,
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
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="signup" element={<LoginAndSignup />} />
        <Route path="login" element={<LoginAndSignup />} />
        <Route path="/" element={<Protected />}>
          <Route path="/" index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/food" element={<Category title="Food" data={foods}/>} />
          <Route path="/grocery" element={<Category title="Grocery" data={grocery}/>} />
          <Route path="/medicine" element={<Category title="Medicine" data={medicine} />} />
          <Route path="/product" element={<Product />}>
            <Route path=":categoryType/:productId" element={<Product />} />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
          <Route path="/add" element={<AddData/>} />
        </Route>
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
