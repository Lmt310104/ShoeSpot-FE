import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/error/error-page";
import HomePage from "./pages/customer/home/home-page";
import AuthLayout from "./components/layouts/auth";
import MainLayout from "./components/layouts/main";
import LoginPage from "./pages/login/login-page";
import SignUpPage from "./pages/sign-up/sign-up-page";
import MyInfoPage from "./pages/customer/my-info/my-info-page";
import PurchaseHistoryPage from "./pages/customer/purchase-history/purchase-history-page";
import CheckoutPage from "./pages/customer/checkout/checkout-page";
import { ToastContainer } from "react-toastify";

import AppProvider from "./context/app-provider";
import ProductDetail from "./pages/customer/Detail";
import Cart from "./pages/customer/cart";
import CartOrder from "./pages/Order";
const allRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> }, // Route mặc định
    ],
    isPrivate: false,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <LoginPage />, isPrivate: false },
      { path: "signup", element: <SignUpPage />, isPrivate: false },
    ],
  },
  {
    path: "app",
    element: <MainLayout />,
    children: [
      { path: "member/my-info", element: <MyInfoPage />, isPrivate: true },
      {
        path: "member/purchase-history",
        element: <PurchaseHistoryPage />,
        isPrivate: true,
      },
      { path: "checkout", element: <CheckoutPage />, isPrivate: true },
    ],
  },
  {
    path: "detail/:postId",
    element: <MainLayout />,
    children: [{ index: true, element: <ProductDetail /> }],
  },
  {
    path: "cart",
    element: <MainLayout />,
    children: [{ index: true, element: <Cart /> }],
  },
  {
    path: "order",
    element: <MainLayout />,
    children: [{ index: true, element: <CartOrder /> }],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

function App() {
  const router = createBrowserRouter(allRouter);
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
