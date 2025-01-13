import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error/error-page";
import HomePage from "./pages/customer/home/home-page";
import ProductDetailPage from "./pages/customer/product-detail/product-detail-page";
import AuthLayout from "./components/layouts/auth";
import MainLayout from "./components/layouts/main";
import LoginPage from "./pages/login/login-page";
import SignUpPage from "./pages/sign-up/sign-up-page";
import CartPage from "./pages/customer/cart/cart-page";
import MyInfoPage from "./pages/customer/my-info/my-info-page";
import PurchaseHistoryPage from "./pages/customer/purchase-history/purchase-history-page";
import CheckoutPage from "./pages/customer/checkout/checkout-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const allRouter = [
  {
    path: "/",
    children: [
      { index: true, element: <HomePage />, isPrivate: false },
      {
        path: "pruduct-detail/:id",
        element: <ProductDetailPage />,
        isPrivate: true,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { index: true, element: <LoginPage />, isPrivate: false },
          { path: "login", element: <LoginPage />, isPrivate: false },
          { path: "signup", element: <SignUpPage />, isPrivate: false },
        ],
      },
      {
        path: "/app",
        element: <MainLayout />,
        children: [
          { path: "cart", element: <CartPage />, isPrivate: true },
          {
            path: "member/my-info",
            element: <MyInfoPage />,
            isPrivate: true,
          },
          {
            path: "member/purchase-history",
            element: <PurchaseHistoryPage />,
            isPrivate: true,
          },
          { path: "checkout", element: <CheckoutPage />, isPrivate: true },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
];

function App() {
  const router = createBrowserRouter(allRouter);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
